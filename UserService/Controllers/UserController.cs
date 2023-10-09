using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserService.Entities;
using UserService.Service;
using Newtonsoft.Json;
using System.Diagnostics;

namespace KeepNote.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IKafkaProducer<Null, string> _kafkaProducer;
        public UserController(IUserService userService, IKafkaProducer<Null, string> kafkaProducer)
        {
            _userService = userService;
            _kafkaProducer = kafkaProducer;
        }

        [HttpPost("register")]
        public IActionResult RegisterUser(User user)
        {
            if (user.Password != user.confirmPassword)
            {
                return BadRequest("Password and confirm password do not match.");
            }

            var result = _userService.RegisterUser(user);

            if (result)
            {
                SendUserDataToKafka(user.emailId);
                return Created("", user);
            }

            return Conflict();
        }

        //[HttpPost("login")]
        //public IActionResult LoginUser(User user)
        //{

        //    var isValid = _userService.ValidateUser(user.userId, user.Password,user.confirmPassword);
        //    if (isValid)
        //    {
        //        return Ok(); 
        //    }
        //    return NotFound(); 
        //}

        [HttpPut("update/{emailId}")]
        public IActionResult UpdateUser(string emailId, User user)
        {

            if (emailId != user.emailId)
            {
                return BadRequest("User ID in the URL does not match the user object.");
            }

            var result = _userService.UpdateUser(emailId, user);

            if (result)
            {
                return StatusCode(200);
            }

            return NotFound();
        }


        [HttpDelete("delete/{emailId}")]
        public IActionResult DeleteUser(string emailId)
        {

            var result = _userService.DeleteUser(emailId);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("{emailId}")]
        public IActionResult GetUserByemailId(string emailId)
        {

            var user = _userService.GetUserByemailId(emailId);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPost("upload-image/{emailId}")]
        public IActionResult UploadImage(string emailId, [FromForm] IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
                var fileExtension = Path.GetExtension(image.FileName).ToLower();

                if (allowedExtensions.Contains(fileExtension))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        image.CopyTo(memoryStream);
                        byte[] imageData = memoryStream.ToArray();

                        var result = _userService.UploadUserImage(emailId, imageData);

                        if (result)
                        {
                            return Ok("Image uploaded successfully.");
                        }
                    }
                }
                else
                {
                    return BadRequest("Invalid file format. Supported formats: .png, .jpg, .jpeg.");
                }
            }

            return BadRequest("Invalid image or no image provided.");
        }


        [HttpGet("get-image/{emailId}")]
        public IActionResult GetImage(string emailId)
        {
            var imageData = _userService.GetUserImage(emailId);

            if (imageData != null && imageData.Length > 0)
            {
                return File(imageData, "image/jpeg");
            }

            return NotFound("Image not found.");
        }

        [HttpGet("get-image-url/{emailId}")]
        public IActionResult GetImageUrl(string emailId)
        {
            string imageUrl = Url.Action("GetImage", new { emailId = emailId });
            return Ok(imageUrl);
        }


        [HttpDelete("delete-image/{emailId}")]
        public IActionResult DeleteImage(string emailId)
        {
            var result = _userService.DeleteUserImage(emailId);

            if (result)
            {
                return Ok("Image deleted successfully.");
            }

            return NotFound("Image not found.");
        }

        [HttpPost("send-user-data")]
        public async Task<IActionResult> SendUserDataToKafka([FromForm] string emailId)
        {
            try
            {
                var user = _userService.GetUserByemailId(emailId);


                if (user != null)
                {
                    var userData = new
                    {
                        EmailId = user.emailId,
                        Password = user.Password
                    };

                    string message = JsonConvert.SerializeObject(userData);

                    var kafkaMessage = new Message<Null, string>
                    {
                        Value = message
                    };

                    // Specify your Kafka topic here
                    string kafkaTopic = "mytopic1";

                    bool result = await _kafkaProducer.ProduceAsync(kafkaTopic, kafkaMessage);

                    if (result)
                    {
                        // Debug output
                        Debug.WriteLine("User data sent to Kafka successfully.");
                        return Ok("User data sent to Kafka successfully.");
                    }
                    else
                    {
                        // Debug output
                        Debug.WriteLine("Failed to send user data to Kafka.");
                        return StatusCode(500, "Failed to send user data to Kafka.");
                    }
                }
                else
                {
                    // Debug output
                    Debug.WriteLine("User not found.");
                    return NotFound("User not found.");
                }
            }
            catch (Exception ex)
            {
                // Debug output
                Debug.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}

