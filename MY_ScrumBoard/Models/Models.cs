using System.ComponentModel.DataAnnotations;

namespace MY_ScrumBoard.Models
{
    public class UserLoginRegister
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string userPassword { get; set; }
    }

    public class User
    {
        [Key]
        public string? userId { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string userPassword { get; set; }
    }

    public class Projects
    {
        [Key]
        public string projectId { get; set; }
        [Required]
        public string ownerId { get; set; }
        [Required]
        public string projectName { get; set; }
    }

    [PrimaryKey(nameof(projectId), nameof(userId))]
    public class Collaboration
    {
        [Required]
        public string projectId { get; set; }
        [Required]
        public string userId { get; set; }
    }

    public class Scrum
    {
        [Key]
        public string scrumId { get; set; }
        [Required]
        public string projectId { get; set; }
        [Required]
        public string scrumName { get; set; }
    }

    public class Statuses
    {
        [Key]
        public int statusId { get; set; }
        [Required]
        public string statusDescription { get; set; }
    }

    public class Notes
    {
        [Key]
        public string noteId { get; set; }
        [Required]
        public string scrumId { get; set; }
        [Required]
        public int statusId { get; set; }
        public string noteValue { get; set; }
    }

    public class Deleted
    {
        [Key]
        public string noteId { get; set; }
        [Required]
        public string scrumId { get; set; }
        [Required]
        public int statusId { get; set; }
        public string noteValues { get; set; }
    }

    public class ChangePasswordData
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string oldPassword { get; set; }
        [Required]
        public string newPassword { get; set; }
    }

    public class PasswordResetModel
    {
        [Required]
        public string ResetToken { get; set; }
        [Required]
        public string newPassword { get; set; }
    }

    public class PasswordResetSys
    {
        [Required]
        public string Id { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordResetToken { get; set; }
    }

    public class RequestRenameProject
    {
        [Required]
        public string projectId { get; set; }
        [Required]
        public string newName { get; set; }
    }

    public class RequestRenameScrum
    {
        [Required]
        public string scrumId { get; set; }
        [Required]
        public string newName { get; set; }
    }

    public class RenameNote
    {
        [Required]
        public string noteId { get; set; }
        [Required]
        public string newValue { get; set; }
    }

    public class ChangeStatusNote
    {
        [Required]
        public string noteId { get; set; }
        [Required]
        public int statusId { get; set; }
    }
}
