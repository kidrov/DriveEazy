using AuthenticationService.Model;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationService.Context
{
    public class AuthDbContext: DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> context)
: base(context)
        {

        }

        public DbSet<LoginData> LoginDatas { get; set; }
    }
}
