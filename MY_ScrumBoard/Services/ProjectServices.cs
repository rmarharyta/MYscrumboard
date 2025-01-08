using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class ProjectServices(ApplicationDbContext _context)
    {
        //створення
        public void CreateProject(string ownerId, string projectName)
        {
            Projects project = new Projects();
            Guid id = Guid.NewGuid();
            project.projectId = id.ToString();
            project.projectName = projectName;
            project.ownerId = ownerId;
            _context.Set<Projects>().Add(project);
            _context.SaveChanges();
        }

        //видалення
        public void DeleteProject(string id, string ownerId)
        {
            var project = _context.Set<Projects>().FirstOrDefault(u => u.projectId == id && u.ownerId==ownerId);

            if (project == null)
            {
                throw new Exception("There is no such project or you cannot delete this project.");
            }
            _context.Set<Projects>().Remove(project);
            _context.SaveChanges();
        }

        //перейменування
        public void RenameProject(string id, string newName)
        {
            var project = _context.Set<Projects>().FirstOrDefault(u => u.projectId == id);
            if (project == null)
            {
                throw new Exception("There is no such project");
            }
            project.projectName = newName;
            _context.SaveChanges();
        }

        //get all projects
        internal IEnumerable<Object> GetAllProjects()
        {
            return _context.Projects;
        }

        //get by owner
        public List<Projects>? GetOwnersProjects(string ownerId)
        {
            var projects = _context.Set<Projects>()
                .Where(u => u.ownerId == ownerId)
                .ToList();
            if (projects == null)
            {
                return null;
            }
            return projects;
        }

        //get by member/collaboration
        public List<Projects>? GetProjectsByMembership(string userId)
        {
            var collaborationProjects = _context.Set<Collaboration>()
                .Where(u => u.userId == userId)
                .Select(u => u.projectId)
                .ToList();
            if (collaborationProjects == null)
            {
                return null;
            }
            var projects = _context.Set<Projects>()
                .Where(u => collaborationProjects.Contains(u.projectId))
                .ToList();
            return projects;
        }

        //get all projects by user
        public List<Projects>? GetAllProjectsByUser(string userId)
        {
            var ownProjects = _context.Set<Projects>()
                .Where(u => u.ownerId == userId)
                .ToList();
            var collaborationProjects = _context.Set<Collaboration>()
                .Where(u => u.userId == userId)
                .Select(u => u.projectId)
                .ToList();
            if (!ownProjects.Any() && !collaborationProjects.Any())
            {
                return null;
            }

            var projects = _context.Set<Projects>()
                .Where(p => collaborationProjects.Contains(p.projectId) || p.ownerId == userId)
                .ToList();

            return projects;
        }
    }
}
