using ErrorOr;
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
    public class PasswordController(PasswordServices _passwordServices, UserServices _userServices, IConfiguration _configuration, IJwtService jwtService, IUserClaimsMapper<User> claimsMapper) : ControllerBase
    {
        static readonly Dictionary<string, PasswordResetSys> _passwordResetTokens = [];
        //changePassword
        [HttpPut]
        [Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordData model)
        {
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
            //var returnedUser = _userServices.GetUserByEmail(email);
            var returnedUser = new User
            {
                userId = Guid.NewGuid().ToString(),
                email = email,
                userPassword = "hashedpassword"
            };

            if (returnedUser == null)
            {
                return Ok();
            }
            string resetToken = jwtService.GenerateToken(returnedUser, DateTime.Now.AddMinutes(10));
            PasswordResetSys passResetSys = new()
            {
                Id = returnedUser.userId!,
                Email = returnedUser.email,
                PasswordResetToken = resetToken
            };
            _passwordResetTokens.Add(resetToken, passResetSys);
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
        public IActionResult ResetPassword([FromBody] PasswordResetModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                //_passwordServices.ChangeForgottenPassword(model);
                if (_passwordResetTokens.TryGetValue(model.ResetToken, out var passReset))
                {
                    var userId = claimsMapper.FromClaims(model.ResetToken)?.userId ?? throw new Exception("UserID is not Found");
                    //_passwordServices.ChangeForgottenPassword(userId, passReset.PasswordResetToken);
                    _passwordResetTokens.Remove(model.ResetToken);
                }
                return Ok("Password reset successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error resetting password" + ex.Message);
            }
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
                Body = $"You have requested to reset your password. Click on this link to reset it: https://myscrumboardmanaging.netlify.app/api/password/{resetToken}"
            };

            SmtpClient smtp = new(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpEmail, smtpPassword),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                EnableSsl = true
            };
            smtp.Send(emailMsg);
        }
    }
}
