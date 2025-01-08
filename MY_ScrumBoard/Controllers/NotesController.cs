using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController(NotesServices _notesServices, IConfiguration _configuration) : ControllerBase
    {
        //create
        [HttpPost]
        [Authorize]
        public IActionResult CreateNote([FromBody] Notes note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notesServices.CreateNewNote(note);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //change value
        [HttpPut("change_value")]
        [Authorize]
        public IActionResult ChangeNoteValue([FromBody] Notes newValue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notesServices.ChangeNote(newValue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //change status
        [HttpPut("change_status")]
        [Authorize]
        public IActionResult ChangeNoteStatus([FromBody] Notes newStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notesServices.ChangeStatus(newStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete note
        [HttpDelete]
        [Authorize]
        public IActionResult DeleteNote([FromBody] Notes note)
        {

            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(currentUserId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                _notesServices.DeleteNoteFromScrum(note, currentUserId);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //get all
        [HttpGet]
        public IActionResult GetAllNotes()
        {
            return Ok(_notesServices.GetAllNotes());
        }

        //get by scrum
        [HttpGet("get_by_scrum")]
        [Authorize]
        public IActionResult GetByScrum(string scrumId)
        {
            if (scrumId == null)
            {
                return BadRequest();
            }
            try
            {
                _notesServices.GetNotesByScrum(scrumId);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
