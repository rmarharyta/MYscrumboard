using ErrorOr;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScrumController(ScrumServices _scrumServices, IUserClaimsMapper<User> userClaimsMapper) : ControllerBase
    {
        private ErrorOr<string> GetUserIdFromToken()
        {
            var token = HttpContext.Request.Cookies[CookieKeys.Token];
            if (string.IsNullOrEmpty(token))
                return Error.Unauthorized("Token not found");

            var user = userClaimsMapper.FromClaims(token);
            if (string.IsNullOrEmpty(user.userId))
                return Error.Unauthorized("User ID claim not found");

            return user.userId;
        }

        //create new scrum
        [HttpPost]
        [Authorize]
        public IActionResult CreateNewScrumBoard([FromBody] Scrum scrum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);


            try
            {
                _scrumServices.CreateScrumBoard(scrum, currentUserId.Value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //rename
        [HttpPut]
        [Authorize]
        public IActionResult RenameScrumBoard([FromBody] RequestRenameScrum renameScrum)
        {
            if (string.IsNullOrEmpty(renameScrum.scrumId) || string.IsNullOrEmpty(renameScrum.newName))
                return BadRequest("Scrum ID or new name is missing.");

            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            try
            {
                _scrumServices.RenameScrum(renameScrum, currentUserId.Value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteScrum([FromBody] string scrumId)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            if (string.IsNullOrEmpty(scrumId))
            {
                return BadRequest("Scrum ID is missing.");
            }

            try
            {
                _scrumServices.DeleteScrumBoard(scrumId, currentUserId.Value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //get all scrum boards
        [HttpGet]
        public IActionResult GetScrums()
        {
            return Ok(_scrumServices.GetAllScrumBoards());
        }

        //get by project
        [HttpGet("get_by_project")]
        [Authorize]
        public IActionResult GetScrumByProject([FromBody] string projectId)
        {
            if (string.IsNullOrEmpty(projectId))
            {
                return BadRequest("Project ID is missing.");
            }

            try
            {
                return Ok(_scrumServices.GetScrumBoardsByProject(projectId));
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }
    }
}
