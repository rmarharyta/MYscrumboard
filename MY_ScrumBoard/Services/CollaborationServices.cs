using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class CollaborationServices(ApplicationDbContext _context)
    {
        //create collaboration
        public void CreateCollaboration(Collaboration collaboration, string ownerId)
        {
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == collaboration.projectId && u.ownerId == ownerId);
            if (project == null)
            {
                throw new Exception("There is no such project");
            }
            var user = _context.Set<User>().FirstOrDefault(u => u.userId == collaboration.userId);
            if (user == null)
            {
                throw new Exception("There is no such user");
            }
            _context.Collaboration.Add(collaboration);
            _context.SaveChangesAsync();
        }

        //delete
        public void DeleteCollaborationServ(Collaboration collaboration)
        {
            if (collaboration == null)
            {
                throw new Exception("There is no such collaboration");
            }
            _context.Collaboration.Remove(collaboration);
            _context.SaveChangesAsync();
        }

        //get all collaboration
        internal IEnumerable<Object> GetAllCollaborations()
        {
            return _context.Collaboration;
        }

        //get by project
        public List<Collaboration>? GetProjectsCollaboration(string projectId)
        {
            var collaborations = _context.Set<Collaboration>()
                .Where(u => u.projectId == projectId)
                .ToList();
            if (collaborations == null)
            {
                return null;
            }
            return collaborations;
        }
    }
}
