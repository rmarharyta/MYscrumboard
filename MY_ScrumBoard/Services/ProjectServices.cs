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
            _context.SaveChangesAsync();
        }

        //видалення
        public void DeleteProject(string id)
        {
            var project = _context.Set<Projects>().FirstOrDefault(u => u.projectId == id);

            if (project == null)
            {
                throw new Exception("There is no such project");
            }
            _context.Set<Projects>().Remove(project);
            _context.SaveChangesAsync();
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
            _context.SaveChangesAsync();
        }

        //get all projects
        internal IEnumerable<Object> GetAllProjects()
        {
            return _context.Projects;
        }

        //get by owner
        public List<Projects>? GetOwnersProjects(string ownerId){
            var projects = _context.Set<Projects>()
                .Where(u => u.ownerId == ownerId)
                .ToList();
            if (projects == null)
            {
                return null;
            }
            return projects;
        }
    }
}
