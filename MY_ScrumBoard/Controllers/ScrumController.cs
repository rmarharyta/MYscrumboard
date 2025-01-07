using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScrumController(ScrumServices _scrumServices, IConfiguration _configuration) : ControllerBase
    {
        //create new scrum
        [HttpPost]
        [Authorize]
        public IActionResult CreateNewScrumBoard([FromBody] Scrum scrum)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _scrumServices.CreateScrumBoard(scrum);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return Ok();
        }

        //rename
        [HttpPut]
        [Authorize]
        public IActionResult RenameScrumBoard([FromBody] RequestRenameScrum renameScrum)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (renameScrum.scrumId == null || renameScrum.newName == null)
            {
                return BadRequest("Scrum ID or new name is missing.");
            }

            try
            {
                _scrumServices.RenameScrum(renameScrum);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteScrum([FromBody] string scrumId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (scrumId == null)
            {
                return BadRequest("Scrum ID is missing.");
            }

            try
            {
                _scrumServices.DeleteScrumBoard(scrumId);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message + "Something went wrong.");
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
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                _scrumServices.GetScrumBoardsByProject(projectId);
            }
            catch
            {
                return NotFound("This project does not have scrum boards.");
            }
            return Ok();
        }
    }
}
