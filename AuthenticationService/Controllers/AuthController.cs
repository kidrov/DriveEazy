using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AuthenticationService.BAL;
using AuthenticationService.Context;
using AuthenticationService.Model;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private AuthIndexView _indexView;
        IConfiguration _config;
        private AuthDbContext _context;

        public AuthController(AuthIndexView indexView, IConfiguration config, AuthDbContext context)
        {
            _indexView = indexView;
            _config = config;
            _context = context;
            Console.WriteLine("controller ka ctor " + Thread.CurrentThread.Name);
        }

        [HttpPost]
        public ActionResult Create(LoginData createobj)
        {
            try
            {
                if (_indexView.AddUserData(createobj))
                {
                    return StatusCode(200, "Create successfull");

                }
                return StatusCode(500, "Cant Create");

            }
            catch
            {
                return StatusCode(500, "Cant Create");

            }
        }


        [HttpPost("login")]
        public IActionResult? Login(LoginData user)
        {
            string response = string.Empty;
            LoginData? obj = CheckUser(user);
            if (obj != null)
            {
                string tokenString = GenerateToken(obj);
                response = tokenString;
                return StatusCode(200, response);
            }
            else
            {
                response = "";
                return StatusCode(200, response);
            }
        }
        private string GenerateToken(LoginData obj)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = credentials

            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
        private LoginData? CheckUser(LoginData user)
        {
            LoginData? userobj = _context.LoginDatas.FirstOrDefault(x =>
            x.LoginEmail == user.LoginEmail && x.LoginPassword == user.LoginPassword);
            return userobj;
        }

        [HttpPost("updatepassword")]
        public ActionResult UpdatePassword(PasswordUpdate obj)
        {
            try
            {
                if (_indexView.UpdateUserPassword(obj))
                {
                    return StatusCode(200, "Password Changed Sucessfully");

                }
                return StatusCode(500, "Cant Change the Password");

            }
            catch
            {
                return StatusCode(500, "Cant Change the Password");

            }
        }

        [HttpGet("{emailId}")]
        public IActionResult GetUserByemailId(string emailId)
        {

            var user = _context.LoginDatas.FirstOrDefault(x =>
            x.LoginEmail == emailId);
            if (user != null)
            {
                return StatusCode(200, user);
            }
            return StatusCode(200, user);
        }

    }
}
