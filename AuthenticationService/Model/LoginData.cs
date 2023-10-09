using System.ComponentModel.DataAnnotations;

namespace AuthenticationService.Model
{
    public class LoginData
    {
        public int LoginDataId { get; set; }
        [Required]
        public string LoginEmail { get; set; } = "";
        [Required]
        public string LoginPassword { get; set; } = "";
    }
}
