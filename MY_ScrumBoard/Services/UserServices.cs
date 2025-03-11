
using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    //Interface for services
    public interface IUserService
    {
        string Registration(UserLoginRegister userRegister);
        void DeleteUser(string userId);
        string? LogIn(UserLoginRegister userLogin);
        IEnumerable<User> GetAllUsers();
        List<object>? GetByProject(string projectId);
        List<object>? SearchUsers(string searchTerm);
    }
    public class UserServices(ApplicationDbContext _context) : IUserService
    {
        public string Registration(UserLoginRegister userRegister)
        {
            var password = BCrypt.Net.BCrypt.EnhancedHashPassword(userRegister.userPassword);
            User user = new User
            {
                userId = Guid.NewGuid().ToString(),
                userPassword = password,
                email = userRegister.email
            };
            _context.Users.Add(user);
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
        public string? LogIn(UserLoginRegister userLogin)
        {
            var login = _context.Set<User>().FirstOrDefault(u => u.email == userLogin.email);
            if (login == null)
            {
                return null;
            }
            if (BCrypt.Net.BCrypt.EnhancedVerify(userLogin.userPassword, login.userPassword))
            {
                return login.userId;
            }
            return null;
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }

        //get users by project
        public List<object>? GetByProject(string projectId)
        {
            var userIsOwner = _context.Set<Projects>().FirstOrDefault(u => u.projectId == projectId);
            var userIsInCollaboration = _context.Set<Collaboration>()
                .Where(u => u.projectId == projectId)
                .Select(u => u.userId)
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
                .Select(u => new {u.userId, u.email})
                .ToList<object>();
            return users;
        }

        public List<object>? SearchUsers(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return null;
            }

            return _context.Users
                .Where(u => u.email.StartsWith(searchTerm))
                .Take(50)
                .Select(u => new { u.userId, u.email })
                .ToList<object > ();
        }
    }
}
