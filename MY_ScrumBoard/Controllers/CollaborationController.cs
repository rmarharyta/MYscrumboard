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
    public class CollaborationController(CollaborationServices _collaborationServices, IUserClaimsMapper<User> userClaimsMapper) : ControllerBase
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

        //add new collaboration
        [HttpPost]
        [Authorize]
        public IActionResult AddNewCollaboration([FromBody] Collaboration collaboration)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            if (!ModelState.IsValid)
            {
                return BadRequest("Collaboration data is required.");
            }

            try
            {

                return Ok(_collaborationServices.CreateCollaboration(collaboration, currentUserId.Value));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        //delete
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteCollaboration([FromBody] Collaboration collaboration)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            if (!ModelState.IsValid)
            {
                return BadRequest("Collaboration data is required.");
            }

            try
            {
                _collaborationServices.DeleteCollaborationServ(collaboration, currentUserId.Value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "There is no such collaboration");
            }
            return Ok();
        }

        //Get all collaboration
        [HttpGet]
        public IActionResult GetCollaboration()
        {
            return Ok(_collaborationServices.GetAllCollaborations());
        }

        //get by project
        //need to delete it? because we have get users by projects (even if they r not owners)
        [HttpGet("get_by_project")]
        [Authorize]
        public IActionResult GetCollaborationByProject([FromBody] string projectId)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            try
            {
                return Ok(_collaborationServices.GetProjectsCollaboration(projectId, currentUserId.Value));
            }
            catch
            {
                return NotFound("This project does not have collaborations");
            }
        }
    }
}
