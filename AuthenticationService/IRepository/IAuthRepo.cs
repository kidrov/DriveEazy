using AuthenticationService.Model;

namespace AuthenticationService.IRepository
{
    public interface IAuthRepo
    {
        bool AddUserData(LoginData data);
        bool UpdateUserPassword(PasswordUpdate data);
    }
}
