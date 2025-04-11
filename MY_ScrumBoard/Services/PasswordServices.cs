using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Services
{
    public class PasswordServices(ApplicationDbContext _context)
    {
        //changeOldPassword
        public void ChangeOldPassword(ChangePasswordData model)
        {
            var user = _context.Set<User>().FirstOrDefault(u => u.email == model.email);
            if (user == null || !BCrypt.Net.BCrypt.EnhancedVerify(model.oldPassword, user.userPassword))
            {
                throw new Exception("Incorrect Data");
            }
            user.userPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(model.newPassword);
            _context.SaveChanges();
        }

        public void ChangeForgottenPassword(string id, string newPassword)
        {
            var user = _context.Set<User>().FirstOrDefault(u => u.userId == id) ?? throw new Exception("User Not Found");
            user.userPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(newPassword);
            _context.SaveChanges();
        }

    }

}
