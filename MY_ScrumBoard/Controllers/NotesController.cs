using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Security.Claims;

namespace MY_ScrumBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController(NotesServices _notesServices, IUserClaimsMapper<User> userClaimsMapper) : ControllerBase
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
        //create
        [HttpPost]
        [Authorize]
        public IActionResult CreateNote([FromBody] CreateNotes note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Console.WriteLine(note);
                return Ok(_notesServices.CreateNewNote(note));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
        }

        //change value
        [HttpPut("change_note")]
        [Authorize]
        public IActionResult ChangeWholeNote([FromBody] СhangeNote newValue)
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

        //change position
        [HttpPut("change_position")]
        [Authorize]
        public IActionResult ChangeNotePosition([FromBody] ChangePositionNote newPosition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notesServices.ChangePosition(newPosition);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //change status
        [HttpPut("change_color")]
        [Authorize]
        public IActionResult ChangeNoteColor([FromBody] ChangeColorNote newColor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notesServices.ChangeColor(newColor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Something went wrong.");
            }
            return Ok();
        }

        //delete note
        [HttpDelete("{noteId}")]
        [Authorize]
        public IActionResult DeleteNote([FromRoute] string noteId)
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
                _notesServices.DeleteNoteFromScrum(noteId, currentUserId.Value);
            }
            catch (Exception ex)
            {
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
        [HttpGet("get_by_scrum/{scrumId}")]
        [Authorize]
        public IActionResult GetByScrum([FromRoute] string scrumId)
        {
            if (scrumId == null)
            {
                return BadRequest("The scrum id is required.");
            }
            try
            {
                return Ok(_notesServices.GetNotesByScrum(scrumId));
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
