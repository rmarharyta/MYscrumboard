using ErrorOr;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(UserServices _userServices, IEncryptionService encryptionService, Services.IAuthenticationService authenticationService, IJwtService jwtService, IUserClaimsMapper<User> userClaimsMapper) : ControllerBase
    {
        //Register
        [HttpPost]
        [Route("/api/registration")]
        public IActionResult RegistrationUser([FromBody] UserLoginRegister userRegister)
        {
            if (userRegister == null)
            {
                return BadRequest("User data is required.");
            }
            try
            {
                var returnedUserId = _userServices.Registration(userRegister);
                var user = new User
                {
                    userId = returnedUserId
                };
                var tokenExpiration = DateTime.UtcNow.Add(AuthenticationSettings.TokenExpiration);

                string token = jwtService.GenerateToken(user, tokenExpiration);
                string refreshToken = encryptionService.Encrypt(encryptionService.SecretKeys.RefreshTokenEncryptionSecretKey, returnedUserId);

                authenticationService.SetAuthCookies(HttpContext, token, refreshToken);

                return CreatedAtAction(nameof(RegistrationUser), new { returnedUserId });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        //log in
        [HttpPost]
        [Route("/api/login")]
        public IActionResult LogInUsers([FromBody] UserLoginRegister userLogin)
        {
            Console.WriteLine("Login");
            if (userLogin == null)
                return BadRequest("User data is required.");

            try
            {
                var returnedUserId = _userServices.LogIn(userLogin)
                    ?? throw new Exception("Login is failed");

                var user = new User
                {
                    userId = returnedUserId
                };
                var tokenExpiration = DateTime.UtcNow.Add(AuthenticationSettings.TokenExpiration);

                string token = jwtService.GenerateToken(user, tokenExpiration);
                string refreshToken = encryptionService.Encrypt(encryptionService.SecretKeys.RefreshTokenEncryptionSecretKey, returnedUserId);

                authenticationService.SetAuthCookies(HttpContext, token, refreshToken);

                return Ok(new { returnedUserId });
            }
            catch (Exception ex)
            {
                return BadRequest("Problem: " + ex.Message);
            }
        }
        //logout
        [HttpGet]
        [Route("/api/logout")]
        public IActionResult Logout()
        {
            authenticationService.RemoveAuthCookies(HttpContext);
            return Ok();
        }

        //delete
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteUsers()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                _userServices.DeleteUser(currentUserId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not delete {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userServices.GetAllUsers());
        }

        [HttpGet("search")]
        public IActionResult SearchUsers([FromQuery] string searchTerm)
        {
            var users = _userServices.SearchUsers(searchTerm);
            return Ok(users);
        }

        //get by project
        [HttpGet("get_by_project/{projectId}")]
        public IActionResult GetByProject([FromRoute] string projectId)
        {
            if (projectId == null)
            {
                return BadRequest(projectId);
            }
            try
            {
                return Ok(_userServices.GetUsersByProject(projectId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " Something went wrong.");
            }
        }

        [HttpGet]
        [Route("/api/refresh")]
        public IActionResult RefreshToken()
        {
            string? refreshToken = HttpContext.Request.Cookies[CookieKeys.RefreshToken];
            if (refreshToken is null)
                return Unauthorized();

            string userId = encryptionService.Decrypt(encryptionService.SecretKeys.RefreshTokenEncryptionSecretKey, refreshToken);
            if (userId == null)
                return Unauthorized();

            try
            {
                var user = new User { userId = userId };
                var token = jwtService.GenerateToken(user, DateTime.UtcNow.Add(AuthenticationSettings.TokenExpiration));
                authenticationService.SetAuthCookies(HttpContext, token, refreshToken);
                return Ok();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Route("/api/me")]
        public IActionResult GetUser()
        {
            var user = GetUserFromToken();
            if (!user.IsError)
                return Ok(new { user.Value.userId });
            return BadRequest(new { Error = user.FirstError.Code });
        }

        private ErrorOr<User> GetUserFromToken()
        {
            var token = HttpContext.Request.Cookies[CookieKeys.Token];
            if (string.IsNullOrEmpty(token))
                return Error.Unauthorized("Token not found");

            var user = userClaimsMapper.FromClaims(token);
            if (user is not null)
                return user;

            return Error.Unauthorized("User ID claim not found");
        }
    }
}
