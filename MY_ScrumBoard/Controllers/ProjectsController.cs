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
    public class ProjectsController(ProjectServices _projectServices, IUserClaimsMapper<User> userClaimsMapper) : ControllerBase
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
        //create new project
        [HttpPost("create_new_project")]
        [Authorize]
        public IActionResult CreateNewProject([FromBody] string projectName)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            if (projectName == null)
            {
                return BadRequest("There is no name for project");
            }
            try
            {
                _projectServices.CreateProject(currentUserId.Value, projectName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        //rename project
        [HttpPut]
        [Authorize]
        public IActionResult RenameProject([FromBody] RequestRenameProject renameProject)
        {
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
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete project
        //Change: [HttpDelete] -> [HttpDelete("{projectId}")]
        [HttpDelete("{projectId}")]
        [Authorize]
        public IActionResult DeleteProject([FromRoute] string projectId)
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            if (string.IsNullOrWhiteSpace(projectId))
            {
                return BadRequest("Project ID is missing.");
            }

            try
            {
                _projectServices.DeleteProject(projectId, currentUserId.Value);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong: " + ex.Message);
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
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);


            try
            {

                return Ok(_projectServices.GetOwnersProjects(currentUserId.Value));
            }
            catch (Exception e)
            {
                return BadRequest("Couldn't get projects: " + e.Message);
            }
        }

        //get by membership/collaboration
        [HttpGet("get_by_membership")]
        [Authorize]
        public IActionResult GetOwners()
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            try
            {

                return Ok(_projectServices.GetProjectsByMembership(currentUserId.Value));
            }
            catch (Exception e)
            {
                return BadRequest("Couldn't get projects: " + e.Message);
            }
        }

        //get all projects for user
        [HttpGet("get_by_user")]
        [Authorize]
        public IActionResult GetByUser()
        {
            var currentUserId = GetUserIdFromToken();
            if (currentUserId.IsError)
                return Unauthorized(currentUserId.FirstError.Code);

            try
            {
                return Ok(_projectServices.GetAllProjectsByUser(currentUserId.Value));
            }
            catch (Exception e)
            {
                return BadRequest("Couldn't get projects: " + e.Message);
            }
        }
    }
}
