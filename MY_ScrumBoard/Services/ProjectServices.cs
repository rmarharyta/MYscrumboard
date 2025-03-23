using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class ProjectServices(ApplicationDbContext _context)
    {
        //створення
        public void CreateProject(string ownerId, string projectName)
        {
            var project_exist = _context.Projects.FirstOrDefault(u => u.ownerId == ownerId && u.projectName == projectName);
            if (project_exist != null)
            {
                throw new Exception("Project with that name already exist;");
            }
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
            var project = _context.Set<Projects>().FirstOrDefault(u => u.projectId == id)
                ?? throw new Exception("There is no such project");
            if (project.ownerId != ownerId)
            {
                var collaboration = _context.Collaboration
                    .FirstOrDefault(c => c.projectId == project.projectId && c.userId == ownerId);

                if (collaboration != null)
                {
                    _context.Collaboration.Remove(collaboration);
                }
            }
            else
            {
                _context.Set<Projects>().Remove(project);
            }
            _context.SaveChanges();
        }

        //перейменування
        public void RenameProject(string id, string newName)
        {
            var project = _context.Set<Projects>().FirstOrDefault(u => u.projectId == id)
                ?? throw new Exception("There is no such project");

            project.projectName = newName;
            _context.SaveChanges();
        }

        //get all projects
        internal IEnumerable<Projects> GetAllProjects()
        {
            return _context.Projects;
        }

        //get by owner
        public List<Projects>? GetOwnersProjects(string ownerId)
        {
            var projects = _context.Set<Projects>()
                .Where(u => u.ownerId == ownerId);

            return projects.ToList();
        }

        //get by member/collaboration
        public List<Projects>? GetProjectsByMembership(string userId)
        {
            var collaborationProjects = _context.Set<Collaboration>()
                .Where(u => u.userId == userId)
                .Select(u => u.projectId);

            if (!collaborationProjects.Any())
            {
                return null;
            }
            var projects = _context.Set<Projects>()
                .Where(u => collaborationProjects.Contains(u.projectId));

            return projects.ToList();
        }

        //get all projects by user
        public List<Projects>? GetAllProjectsByUser(string userId)
        {
            var ownProjects = _context.Set<Projects>()
                .Where(u => u.ownerId == userId);

            var collaborationProjects = _context.Set<Collaboration>()
                .Where(u => u.userId == userId)
                .Select(u => u.projectId)
                .ToList();

            if (!ownProjects.Any() && collaborationProjects.Count == 0)
            {
                return null;
            }

            var projects = _context.Set<Projects>()
                .Where(p => collaborationProjects.Contains(p.projectId) || p.ownerId == userId);

            return projects.ToList();
        }
    }
}
