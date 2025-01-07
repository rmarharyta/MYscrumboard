using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController(ProjectServices _projectServices, IConfiguration _configuration) : ControllerBase
    {
        //create new project
        [HttpPost]
        [Authorize]
        public IActionResult CreateNewProject([FromBody] string projectName)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (projectName == null)
            {
                return BadRequest("There is no name for project");
            }
            try
            {
                _projectServices.CreateProject(currentUserId, projectName);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return Ok();
        }

        //rename project
        [HttpPut]
        [Authorize]
        public IActionResult RenameProject([FromBody] RequestRenameProject renameProject)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (renameProject.projectId == null || renameProject.newName == null)
            {
                return BadRequest("Project ID or new name is missing.");
            }

            try
            {
                _projectServices.RenameProject(renameProject.projectId, renameProject.newName);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete project
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteProject([FromBody] string projectId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            if (projectId == null)
            {
                return BadRequest("Project ID is missing.");
            }

            try
            {
                _projectServices.DeleteProject(projectId);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //get projects
        [HttpGet]
        public IActionResult GetProjects()
        {
            return Ok(_projectServices.GetAllProjects());
        }

        //get by owner
        [HttpGet("get_by_owner")]
        [Authorize]
        public IActionResult GetProjectsByOwner()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                _projectServices.GetOwnersProjects(currentUserId);
            }
            catch
            {
                return NotFound("This user has no own projects.");
            }
            return Ok();
        }
    }
}
