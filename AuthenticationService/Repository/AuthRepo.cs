using AuthenticationService.Context;
using AuthenticationService.IRepository;
using AuthenticationService.Model;

namespace AuthenticationService.Repository
{
    public class AuthRepo : IAuthRepo
    {

        private AuthDbContext _context;
        public AuthRepo(AuthDbContext context)
        {
            _context = context;
        }
        public bool AddUserData(LoginData data)
        {
            try
            {
                _context.LoginDatas.Add(data);
                _context.SaveChanges();
                return true;
            }
            catch
            { 
                return false;
            }
        }

        public bool UpdateUserPassword(PasswordUpdate data)
        {
            try
            {
                LoginData? userobj = _context.LoginDatas.FirstOrDefault(x =>
           x.LoginEmail == data.Email && x.LoginPassword == data.OldPassword);
                if (userobj != null)
                {
                    userobj.LoginPassword = data.NewPassword;
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

    }
}
