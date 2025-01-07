using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class ScrumServices(ApplicationDbContext _context)
    {
        //create
        public void CreateScrumBoard(Scrum scrum)
        {
            Guid id = Guid.NewGuid();
            scrum.scrumId = id.ToString();
            _context.Set<Scrum>().Add(scrum);
            _context.SaveChangesAsync();
        }

        //rename
        public void RenameScrum(RequestRenameScrum renameScrum)
        {
            var scrum = _context.Set<Scrum>().FirstOrDefault(u => u.scrumId == renameScrum.scrumId);
            if (scrum == null)
            {
                throw new Exception("There is no such scrum board");
            }
            scrum.scrumName = renameScrum.newName;
            _context.SaveChangesAsync();
        }

        //delete
        public void DeleteScrumBoard(string id)
        {
            var scrum = _context.Set<Scrum>().FirstOrDefault(u => u.scrumId == id);

            if (scrum == null)
            {
                throw new Exception("There is no such scrum");
            }
            _context.Set<Scrum>().Remove(scrum);
            _context.SaveChangesAsync();
        }

        //get all scrum
        internal IEnumerable<Object> GetAllScrumBoards()
        {
            return _context.Scrum;
        }

        //get by project
        public List<Scrum>? GetScrumBoardsByProject(string projectId)
        {
            var scrum_boards = _context.Set<Scrum>()
                .Where(u => u.projectId == projectId)
                .ToList();
            if (scrum_boards == null)
            {
                return null;
            }
            return scrum_boards;
        }
    }
}
