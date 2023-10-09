using AuthenticationService.IRepository;
using AuthenticationService.Model;
using AuthenticationService.Repository;

namespace AuthenticationService.BAL
{
    public class AuthIndexView
    {
        private AuthRepo _Repo;
        public AuthIndexView(AuthRepo repo)
        {

            _Repo = repo;

        }
        public bool AddUserData(LoginData data)
        {
            if(data == null || data.LoginEmail==null || data.LoginEmail==string.Empty || data.LoginPassword==null || data.LoginPassword==string.Empty)
            {
                return false;
            }
            return _Repo.AddUserData(data);
        }

        public bool UpdateUserPassword(PasswordUpdate data)
        {
            return _Repo.UpdateUserPassword(data);
        }
    }
}
