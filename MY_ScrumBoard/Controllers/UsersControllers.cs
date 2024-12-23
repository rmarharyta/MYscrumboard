using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersControllers : ControllerBase
    {
        [HttpPost]
        public IActionResult PostUsers([FromBody] Users user)
        {
            try
            {
                UserServices.PostUser(user);
                return CreatedAtAction(nameof(PostUsers), new { userId = user.userId }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteUsers([FromRoute] string Id)
        {
            try
            {
                UserServices.DeleteUser(Id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not delete {ex.Message}");
            }
        }
    }
}
