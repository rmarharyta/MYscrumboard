using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController(PasswordServices _passwordServices, IConfiguration _configuration) : ControllerBase
    {
        //changePassword
        [HttpPut]
        [Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordData model)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(currentUserId))
            {
                return Unauthorized("User ID not found in token.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("User data is required.");
            }
            try
            {
                _passwordServices.ChangeOldPassword(model);
                return Ok("Password updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }
        //request for changing password
        [HttpPost("request_reset_password")]
        public IActionResult RequestPasswordReset([FromBody] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var returnedUser = _passwordServices.ResetPasswordEmail(email);
            if (returnedUser == null)
            {
                return BadRequest("There is no such user");
            }
            string resetToken = GenerateJWTToken(returnedUser);
            PasswordResetSys passResetSys = new()
            {
                Id = returnedUser.userId!,
                Email = returnedUser.email,
                PasswordResetToken = resetToken
            };
            try
            {
                SendPasswordResetEmail(returnedUser.email, resetToken);
                return Ok(new { message = "Password reset email sent." });
            }
            catch (Exception)
            {
                return StatusCode(500, "Error sending password reset email.");
            }

        }
        [HttpPost("reset_password")]
        [Authorize]
        public IActionResult ResetPassword([FromBody] PasswordResetModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _passwordServices.ChangeForgottenPassword(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error resetting password" + ex.Message);
            }
            return Ok("Password reset successfully");
        }
        //generate temporary token for changing password
        private string GenerateJWTToken(User user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.userId!),
                new(ClaimTypes.Email, user.email)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"] ?? throw new InvalidOperationException("No JWT  Key")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: _configuration["JwtConfig:Issuer"],
                audience: _configuration["JwtConfig:Audience"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: credentials
             );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
        //send email to the user
        private void SendPasswordResetEmail(string email, string resetToken)
        {
            IConfiguration emailSettings = _configuration.GetSection("EmailSettings");

            string smtpServer = emailSettings["SmtpServer"] ?? throw new InvalidOperationException("No SmtpServer");
            int smtpPort = int.Parse(emailSettings["SmtpPort"] ?? throw new InvalidOperationException("No SmtpPort"));
            string smtpEmail = emailSettings["SmtpEmail"] ?? throw new InvalidOperationException("No SmtpEmail");
            string smtpPassword = emailSettings["SmtpPassword"] ?? throw new InvalidOperationException("No SmtpPassword");

            // Construct the email message
            MailMessage emailMsg = new()
            {
                To = { new MailAddress(email) },
                From = new MailAddress(smtpEmail),
                Subject = "Password Reset Request",
                Body = $"You have requested to reset your password. Click on this link to reset it: {resetToken}"
            };

            SmtpClient smtp = new(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpEmail, smtpPassword),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                EnableSsl = true
            };
            smtp.Send(emailMsg);
        }

        //check validation of jwt
        //private bool ValidateToken(string token)
        //{
        //    try
        //    {
        //        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));

        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var validationParameters = new TokenValidationParameters
        //        {
        //            ValidateIssuer = true, // Перевірка відповідності "Issuer"
        //            ValidateAudience = true, // Перевірка відповідності "Audience"
        //            ValidateLifetime = true, // Перевірка терміну дії
        //            ValidateIssuerSigningKey = true, // Перевірка підпису
        //            ValidIssuer = _configuration["JwtConfig:Issuer"],
        //            ValidAudience = _configuration["JwtConfig:Audience"],
        //            IssuerSigningKey = securityKey
        //        };

        //        // Перевіряємо токен
        //        var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

        //        if (validatedToken is JwtSecurityToken jwtToken &&
        //            jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        //        {
        //            return true; // Токен дійсний
        //        }

        //        return false; // Токен недійсний
        //    }
        //    catch (SecurityTokenExpiredException)
        //    {
        //        Console.WriteLine("Token has expired.");
        //        return false;
        //    }
        //    catch (SecurityTokenException)
        //    {
        //        Console.WriteLine("Invalid token.");
        //        return false;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"An error occurred: {ex.Message}");
        //        return false;
        //    }
        //}
    }
}
