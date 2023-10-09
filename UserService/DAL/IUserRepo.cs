using UserService.Entities;

namespace UserService.DAL
{
    public interface IUserRepo
    {
        bool RegisterUser(User user);
        bool UpdateUser(User user);
        User GetUserByemailId(string emailId);
        bool ValidateUser(int userId, string password, string confirmPassword);
        bool DeleteUser(string emailId);

        bool UploadUserImage(string emailId, byte[] imageData);
        byte[] GetUserImage(string emailId);
        bool DeleteUserImage(string emailId);

    }
}
