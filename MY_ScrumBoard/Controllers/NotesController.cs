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
    }
}
