
using MY_ScrumBoard.Models;
using Org.BouncyCastle.Math.EC;

namespace MY_ScrumBoard.Services
{
    public class UserServices(ApplicationDbContext _context)
    {
        public string Registration(User user)
        {
            Guid id = Guid.NewGuid();
            user.userId = id.ToString();
            var password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.userPassword);
            user.userPassword= password;
            var signIn = _context.Users.Add(user);
            _context.SaveChanges();
            return user.userId;
        }
        public void DeleteUser(string userId)
        {
            var user = _context.Set<User>().FirstOrDefault(u => u.userId == userId);

            if (user != null)
            {
                _context.Set<User>().Remove(user);

                _context.SaveChanges();
            }
        }
        public string? LogIn(User user)
        {
            var login = _context.Set<User>().FirstOrDefault(u => u.email == user.email);
            if (login == null)
            {
                return null;
            }
            if (BCrypt.Net.BCrypt.EnhancedVerify( user.userPassword,login.userPassword))
            {
                return login.userId; 
            }
            return null;
        }
        internal IEnumerable<Object> GetAllUsers()
        {
            return _context.Users;
        }

        //get users by project
        public List<User>? GetByProject(string projectId)
        {
            var userIsOwner=_context.Set<Projects>().FirstOrDefault(u => u.projectId == projectId);
            var userIsInCollaboration = _context.Set<Collaboration>()
                .Where(u => u.projectId == projectId)
                .Select(u=>u.userId)
                .ToList();
            if (userIsOwner == null)
            {
                return null;
            }
            var allUserIds = new List<string> { userIsOwner.ownerId }
                .Union(userIsInCollaboration)
                .ToList();
            var users = _context.Set<User>()
                .Where(u => allUserIds.Contains(u.userId))
                .ToList();
            return users;
        }
    }
}
