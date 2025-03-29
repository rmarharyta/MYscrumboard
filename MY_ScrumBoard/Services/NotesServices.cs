using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class NotesServices(ApplicationDbContext _context)
    {
        //create
        public Notes CreateNewNote(CreateNotes notes)
        {
            var scrum = _context.Scrum.FirstOrDefault(u => u.scrumId == notes.scrumId)
                ?? throw new Exception("There is no such scrum."); ;

            Notes note = new Notes();
            Guid id = Guid.NewGuid();
            note.noteId = id.ToString();
            note.scrumId = notes.scrumId;
            note.position = notes.position;
            note.noteValue = notes.noteValue;
            note.colorId = notes.colorId;
            _context.Set<Notes>().Add(note);
            _context.SaveChanges();
            return note;
        }

        //change value
        public void ChangeNote(СhangeNote newValue)
        {
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == newValue.noteId)
                ?? throw new Exception("There is no such note.");
            note.noteValue = newValue.noteValue;
            note.position = newValue.position;
            note.colorId = newValue.colorId;
            _context.SaveChanges();
        }

        //change status
        public void ChangePosition(ChangePositionNote newPosition)
        {
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == newPosition.noteId)
                ?? throw new Exception("There is no such note.");
            note.position = newPosition.position;
            _context.SaveChanges();
        }

        //change color
        public void ChangeColor(ChangeColorNote newColor)
        {
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == newColor.noteId)
                ?? throw new Exception("There is no such note.");
            note.colorId = newColor.colorId;
            _context.SaveChanges();
        }

        //delete note
        public void DeleteNoteFromScrum(string noteId, string userId)
        {
            var UserInCollaboration = _context.Set<Collaboration>()
                .FirstOrDefault(u => u.userId == userId);
            var UserInProject = _context.Set<Projects>()
                .FirstOrDefault(u => u.ownerId == userId);
            if (UserInProject == null && UserInCollaboration == null)
            {
                throw new Exception("This user cannot delete the note");
            }
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == noteId);
            if (note == null)
            {
                throw new Exception("There are not such note");
            }
            _context.Set<Notes>().Remove(note);
            _context.SaveChanges();
        }

        //get all Do Not Use
        internal IEnumerable<Notes> GetAllNotes()
        {
            return _context.Notes;
        }

        //get notes by scrum
        public ICollection<Notes>? GetNotesByScrum(string scrumId)
        {
            var notes = _context.Set<Notes>()
                    .Where(u => u.scrumId == scrumId)
                    .ToList();
            if (notes == null)
            {
                return null;
            }
            return notes;
        }
    }
}
