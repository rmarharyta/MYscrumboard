using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(UserServices _userServices, IConfiguration _configuration) : ControllerBase
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
                return CreatedAtAction(nameof(RegistrationUser), new { returnedUserId, Token = GenerateJWTToken(returnedUserId) });
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
                    ?? throw new Exception("Login is failed");// Edited: New Null check

                return Ok(new { returnedUserId, Token = GenerateJWTToken(returnedUserId) });
            }
            catch (Exception ex)
            {
                return BadRequest("Problem: " + ex.Message);
            }
        }

        //delete
        [HttpDelete("{Id}")]
        public IActionResult DeleteUsers([FromRoute] string Id)
        {
            try
            {
                _userServices.DeleteUser(Id);
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
        public IActionResult GetByProject([FromRoute]string projectId)
        {
            if (projectId == null)
            {
                return BadRequest(projectId);
            }
            try
            {
                return Ok(_userServices.GetByProject(projectId));
            }
            catch (Exception ex) {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        private string GenerateJWTToken(string userId)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: _configuration["JwtConfig:Issuer"],
                audience: _configuration["JwtConfig:Audience"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials
             );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
