using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class ScrumServices(ApplicationDbContext _context)
    {
        //create
        public void CreateScrumBoard(Scrum scrum, string userId)
        {
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == scrum.projectId && u.ownerId == userId);
            if (project == null)
            {
                throw new Exception("You cannot create it.");
            }
            Guid id = Guid.NewGuid();
            scrum.scrumId = id.ToString();
            _context.Set<Scrum>().Add(scrum);
            _context.SaveChanges();
        }

        //rename
        public void RenameScrum(RequestRenameScrum renameScrum, string userId)
        {
            var scrum = _context.Set<Scrum>().FirstOrDefault(u => u.scrumId == renameScrum.scrumId);
            if (scrum == null)
            {
                throw new Exception("There is no such scrum board");
            }
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == scrum.projectId && u.ownerId == userId);
            if (project == null)
            {
                throw new Exception("You cannot rename this scrum");
            }
            scrum.scrumName = renameScrum.newName;
            _context.SaveChanges();
        }

        //delete
        public void DeleteScrumBoard(string id, string ownerId)
        {
            var scrum = _context.Set<Scrum>().FirstOrDefault(u => u.scrumId == id)
                ?? throw new Exception("There is no such scrum");

            var project = _context.Set<Projects>().FirstOrDefault(u => u.ownerId == ownerId && u.projectId == scrum.projectId)
                ?? throw new Exception("You cannot delete this scrum");
            
            _context.Set<Scrum>().Remove(scrum);
            _context.SaveChanges();
        }

        //get all scrum
        internal IEnumerable<Object> GetAllScrumBoards()
        {
            return _context.Scrum;
        }

        //get by project
        public List<Scrum>? GetScrumBoardsByProject(string projectId)
        {
            if (string.IsNullOrWhiteSpace(projectId))
            {
                throw new ArgumentException("projectId IsNullOrEmpty");
            }
            var scrum_boards = _context.Set<Scrum>()
                .Where(u => u.projectId == projectId)?
                .ToList();
            
            return scrum_boards;
        }
    }
}
