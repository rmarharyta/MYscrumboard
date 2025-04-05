using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class ScrumServices(ApplicationDbContext _context)
    {
        //create
        public Scrum CreateScrumBoard(CreateScrum scrum, string userId)
        {
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == scrum.projectId );//тут
            if (project == null)
            {
                throw new Exception("You cannot create it.");
            }
            Scrum newScrum = new Scrum();
            newScrum.projectId = scrum.projectId;
            newScrum.scrumName = scrum.scrumName;
            Guid id = Guid.NewGuid();
            newScrum.scrumId = id.ToString();
            _context.Set<Scrum>().Add(newScrum);
            _context.SaveChanges();
            return newScrum;
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
        internal IEnumerable<Scrum> GetAllScrumBoards()
        {
            return _context.Scrum;
        }

        //get by project
        public GetScrums? GetScrumBoardsByProject(string projectId)
        {
            if (string.IsNullOrWhiteSpace(projectId))
            {
                throw new ArgumentException("projectId IsNullOrEmpty");
            }
            var scrum_boards = _context.Set<Scrum>()
                .Where(u => u.projectId == projectId)
                .ToList();
            var project = _context.Set<Projects>().FirstOrDefault(p => p.projectId == projectId);
            if (project == null)
            {
                throw new ArgumentException("project doesn`t exist");
            }
            var ownerId = project.ownerId;

            GetScrums scrums = new GetScrums()
            {
                scrums = scrum_boards,
                ownerId = ownerId
            };
            
            return scrums;
        }
    }
}
