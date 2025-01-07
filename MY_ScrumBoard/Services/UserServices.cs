
using MY_ScrumBoard.Models;

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
            _context.SaveChangesAsync();
            return user.userId;
        }
        public void DeleteUser(string userId)
        {
            var user = _context.Set<User>().FirstOrDefault(u => u.userId == userId);

            if (user != null)
            {
                _context.Set<User>().Remove(user);

                _context.SaveChangesAsync();
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
    }
}
