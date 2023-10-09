using DAL;
using UserService.Entities;

namespace UserService.DAL
{
    public class UserRepo:IUserRepo
    {
        private readonly UserDbContext _dbContext;

        public UserRepo(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool RegisterUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return true;
        }

        public bool UpdateUser(User user)
        {
            var existingUser = _dbContext.Users.Find(user.emailId);
            if (existingUser != null)
            {
                
                existingUser.userName = user.userName;
                existingUser.phoneNo = user.phoneNo;

                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }


        public User GetUserByemailId(string emailId)
        {
            return _dbContext.Users.Find(emailId);
        }

        public bool ValidateUser(int userId, string password, string confirmPassword)
        {
           
            var user = _dbContext.Users.FirstOrDefault(u => u.userId == userId);

            if (user == null)
            {
                return false; 
            }

            bool isPasswordValid = password == user.Password;
            bool isConfirmationValid = password == confirmPassword;
            return isPasswordValid && isConfirmationValid;
        }


        public bool DeleteUser(string emailId)
        {
            var user = _dbContext.Users.Find(emailId);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public bool UploadUserImage(string emailId, byte[] imageData)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.emailId == emailId); 

            if (user == null)
            {
                return false; 
            }

            user.ImageData = imageData;
            _dbContext.SaveChanges();
            return true;
        }

        public byte[] GetUserImage(string emailId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.emailId == emailId); 
            return user?.ImageData;
        }

        public bool DeleteUserImage(string emailId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.emailId == emailId); 

            if (user == null)
            {
                return false; 
            }

            user.ImageData = null;
            _dbContext.SaveChanges();
            return true;
        }


    }
}

