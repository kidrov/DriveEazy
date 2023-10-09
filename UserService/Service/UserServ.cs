using Exceptions;
using UserService.DAL;
using UserService.Entities;

namespace UserService.Service
{
    public class UserServ:IUserService
    {
        private readonly IUserRepo _userRepository;

        public UserServ(IUserRepo repository)
        {
            _userRepository = repository;
        }

        public bool DeleteUser(string emailId)
        {
            
            var existingUser = _userRepository.GetUserByemailId(emailId);
            if (existingUser == null)
            {
                throw new UserNotFoundException($"User with ID {emailId} not found.");
            }

            
            return _userRepository.DeleteUser(emailId);
        }

        public User GetUserByemailId(string emailId)
        {
            
            return _userRepository.GetUserByemailId(emailId);
        }

        public bool RegisterUser(User user)
        {
           
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
            }

            return _userRepository.RegisterUser(user);
        }

        public bool UpdateUser(string emailId, User user)
        {
            
            var existingUser = _userRepository.GetUserByemailId(emailId);
            if (existingUser == null)
            {
                throw new UserNotFoundException($"User with ID {emailId} not found.");
            }

            existingUser.userName = user.userName;
            existingUser.phoneNo = user.phoneNo;

            return _userRepository.UpdateUser(user);
        }

        public bool ValidateUser(int userId, string password, string confirmPassword)
        {
           
            bool isUserValid = _userRepository.ValidateUser(userId, password,confirmPassword);

            bool isConfirmationValid = password == confirmPassword;

            return isUserValid && isConfirmationValid;
        }

        public bool UploadUserImage(string emailId, byte[] imageData)
        {
            var existingUser = _userRepository.GetUserByemailId(emailId);
            if (existingUser == null)
            {
                throw new UserNotFoundException($"User with email {emailId} not found.");
            }

            existingUser.ImageData = imageData;
            return _userRepository.UpdateUser(existingUser);
        }

        public byte[] GetUserImage(string emailId)
        {
            var user = _userRepository.GetUserByemailId(emailId);
            return user?.ImageData;
        }

        public bool DeleteUserImage(string emailId)
        {
            var existingUser = _userRepository.GetUserByemailId(emailId);
            if (existingUser == null)
            {
                throw new UserNotFoundException($"User with email {emailId} not found.");
            }

            existingUser.ImageData = null;
            return _userRepository.UpdateUser(existingUser);
        }
    }
}


