using MY_ScrumBoard.Models;
using System.Reflection.Metadata.Ecma335;

namespace MY_ScrumBoard.Services
{
    public class CollaborationServices(ApplicationDbContext _context)
    {
        //create collaboration
        public Collaboration CreateCollaboration(Collaboration collaboration, string userId)
        {
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == collaboration.projectId && u.ownerId == userId);
            if (project == null)
            {
                throw new Exception("There is no such project or you cannot add new member.");
            }
            if (project.ownerId == collaboration.userId)
            {
                throw new Exception("You are the owner");
            }
            var user = _context.Set<User>().FirstOrDefault(u => u.userId == collaboration.userId);
            if (user == null)
            {
                throw new Exception("There is no such user");
            }
            _context.Collaboration.Add(collaboration);
            _context.SaveChanges();
            return collaboration;
        }
        

        //delete
        public void DeleteCollaborationServ(Collaboration collaboration,string ownerId)
        {
            if (collaboration == null)
            {
                throw new Exception("There is no such collaboration");
            }
            var project = _context.Set<Projects>()
                .FirstOrDefault(u => u.projectId == collaboration.projectId && u.ownerId == ownerId);
            if (project == null) {
                throw new Exception("You cannot delete this collaboration.");
            }
            _context.Collaboration.Remove(collaboration);
            _context.SaveChanges();
        }

        //get all collaboration
        internal IEnumerable<Collaboration> GetAllCollaborations()
        {
            return _context.Collaboration;
        }

        //get by project
        public List<Collaboration>? GetProjectsCollaboration(string projectId,string userId)
        {
            var collaboration_check = _context.Collaboration.FirstOrDefault(u => u.userId == userId && u.projectId == projectId);
            var owner_check = _context.Projects.FirstOrDefault(u => u.ownerId == userId && u.projectId == projectId);
            if (collaboration_check == null && owner_check == null)
            {
                return null;
            }
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
