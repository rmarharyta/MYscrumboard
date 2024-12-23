using MY_ScrumBoard.Models;

namespace MY_ScrumBoard.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> context) : base(context)
        {

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Collaboration> Collaboration { get; set; }
        public DbSet<Scrum> Scrum { get; set; }
        public DbSet<Statuses> Statuses { get; set; }
        public DbSet<Notes> Notes { get; set; }
        public DbSet<Deleted> Deleted { get; set; }
    }
}
