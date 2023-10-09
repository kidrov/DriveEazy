using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserService.Entities
{
    public class User
    { 

            
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int userId { get; set; }

            [MaxLength(60)]
            [Required]
            public string? userName { get; set; }

            [Key]
            [MaxLength(320)]
            [Required]
            [EmailAddress(ErrorMessage = "Invalid email address format.")]
            public string? emailId { get; set; }

            [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
            [MaxLength(32, ErrorMessage = "Password must not exceed 32 characters.")]
            [Required]
            public string? Password { get; set; }

            [MinLength(8, ErrorMessage = "Confirmation password must be at least 8 characters.")]
            [MaxLength(32, ErrorMessage = "Confirmation password must not exceed 32 characters.")]
            [Required]
            public string? confirmPassword { get; set; }

            [Range(1000000000, 9999999999, ErrorMessage = "Phone number must be a 10-digit number.")]
            public long? phoneNo { get; set; }

            public byte[]? ImageData { get; set; }


        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        }
    }
