using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class NotesServices(ApplicationDbContext _context)
    {
        //create
        public void CreateNewNote(Notes notes)
        {
            var scrum = _context.Scrum.FirstOrDefault(u => u.scrumId == notes.scrumId);
            if (scrum == null)
            {
                throw new Exception("There is no such scrum.");
            }
            Guid id = Guid.NewGuid();
            notes.noteId = id.ToString();
            _context.Set<Notes>().Add(notes);
            _context.SaveChanges();
        }

        //change value
        public void ChangeNote(RenameNote newValue)
        {
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == newValue.noteId);
            if (note == null)
            {
                throw new Exception("There is no such note.");
            }
            note.noteValue = newValue.newValue;
            _context.SaveChanges();
        }

        //change status
        public void ChangeStatus(ChangeStatusNote newStatus)
        {
            var note = _context.Set<Notes>().FirstOrDefault(u => u.noteId == newStatus.noteId);
            if (note == null)
            {
                throw new Exception("There is no such note.");
            }
            note.statusId = newStatus.statusId;
            _context.SaveChanges();
        }

        //delete note
        public void DeleteNoteFromScrum(Notes note, string userId)
        {
            var UserInCollaboration = _context.Set<Collaboration>()
                .FirstOrDefault(u => u.userId == userId);
            var UserInProject = _context.Set<Projects>()
                .FirstOrDefault(u => u.ownerId == userId);
            if (UserInProject == null || UserInCollaboration == null)
            {
                throw new Exception("This user cannot delete the note");
            }
            _context.Set<Notes>().Remove(note);
            _context.SaveChanges();
        }

        //get all
        internal IEnumerable<Object> GetAllNotes()
        {
            return _context.Notes;
        }

        //get notes by scrum
        public List<Notes>? GetNotesByScrum(string scrumId)
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
