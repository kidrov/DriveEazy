using Microsoft.EntityFrameworkCore;
using UserService.Entities;

namespace DAL
{
    public class UserDbContext : DbContext
    {
        public UserDbContext() { }
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
    }
}
