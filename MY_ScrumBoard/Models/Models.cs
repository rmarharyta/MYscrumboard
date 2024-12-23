using System.ComponentModel.DataAnnotations;

namespace MY_ScrumBoard.Models
{
    public class Users
    {
        [Key]
        private string userId { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string userPassword { get; set; }
    }

    public class Projects
    {
        [Key]
        private string projectId { get; set; }
        [Required]
        public string ownerId { get; set; }
        [Required]
        public string projectName { get; set; }
    }

    public class Collaboration
    {
        [Required]
        private string projectId { get; set; }
        [Required]
        private string userId { get; set; }
    }

    public class Scrum
    {
        [Key]
        private string scrumId { get; set; }
        [Required]
        private string projectId { get; set; }
        [Required]
        private string scrumName { get; set; }
    }

    public class Statuses
    {
        [Key]
        private int statusId { get; set; }
        [Required]
        public string statusDescription { get; set; }
    }

    public class Notes
    {
        [Key]
        private string noteId { get; set; }
        [Required]
        private string scrumId { get; set; }
        [Required]
        private int statusId { get; set; }
        public string noteValues { get; set; }
    }

    public class Deleted
    {
        [Key]
        private string noteId { get; set; }
        [Required]
        private string scrumId { get; set; }
        [Required]
        private int statusId { get; set; }
        public string noteValues { get; set; }
    }
}
