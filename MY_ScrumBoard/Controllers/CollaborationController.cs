using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollaborationController(CollaborationServices _collaborationServices, IConfiguration _configuration) : ControllerBase
    {
        //add new collaboration
        [HttpPost]
        [Authorize]
        public IActionResult AddNewCollaboration([FromBody] Collaboration collaboration)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(currentUserId))
            {
                return Unauthorized("User ID not found in token.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Collaboration data is required.");
            }

            try
            {
                return Ok(_collaborationServices.CreateCollaboration(collaboration, currentUserId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        //delete
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteCollaboration([FromBody]Collaboration collaboration)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(currentUserId))
            {
                return Unauthorized("User ID not found in token.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Collaboration data is required.");
            }

            try
            {
                _collaborationServices.DeleteCollaborationServ(collaboration,currentUserId);
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message+"There is no such collaboration");
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
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                return Ok(_collaborationServices.GetProjectsCollaboration(projectId,currentUserId));
            }
            catch
            {
                return NotFound("This project does not have collaborations");
            }
        }
    }
}
