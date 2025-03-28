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
        public User? ResetPasswordEmail(string email)
        {
            var user = _context.Set<User>().FirstOrDefault(u => u.email == email);
            return user;
        }

        public void ChangeForgottenPassword(PasswordResetModel model)
        {
            var passResetSys = _context.Set<PasswordResetSys>().FirstOrDefault(u => u.PasswordResetToken == model.ResetToken);
            var user = _context.Set<User>().FirstOrDefault(u => u.email == passResetSys.Email);
            if (user == null)
            {
                throw new Exception("User Not Found");
            }
            user.userPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(model.newPassword);
            _context.Set<PasswordResetSys>().Remove(passResetSys);
            _context.SaveChanges();
        }

    }

}
