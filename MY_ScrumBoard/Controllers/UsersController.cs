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
        public IActionResult RegistrationUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }
            try
            {
                var returnedUserId = _userServices.Registration(user);
                return CreatedAtAction(nameof(RegistrationUser), new { returnedUserId, Token = GenerateJWTToken(returnedUserId) });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //log in
        [HttpPut]
        public IActionResult LogInUsers([FromBody] User user)
        {
            Console.WriteLine("Login");
            if (user == null)
            {
                return BadRequest("User data is required.");
            }
            try
            {
                var returnedUserId = _userServices.LogIn(user);
                if (returnedUserId is null)
                {
                    throw new Exception("Login is failed");
                }
                return Ok( new { returnedUserId, Token = GenerateJWTToken(returnedUserId) });
            }
            catch (Exception ex)
            {
                return BadRequest("Problem: "+ ex.Message);
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
