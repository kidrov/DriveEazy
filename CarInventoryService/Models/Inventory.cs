using System;
using System.ComponentModel.DataAnnotations;
using CarInventoryService.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CarInventoryService.Models
{
    public class Inventory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [Required(ErrorMessage = "CarId is required.")]
        [StringLength(10, ErrorMessage = "PlateNo must be at most 10 characters.")]
        [RegularExpression(@"^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$", ErrorMessage = "CarId must have the format 'AB12AB1234'.")]
        public string CarId { get; set; }

        [Required(ErrorMessage = "CarBrand is required.")]
        public string CarBrand { get; set; }

        
        public string CarType { get; set; }

        [Required(ErrorMessage = "CarName is required.")]
        public string CarName { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Registration Year")]
        [DateValidation(ErrorMessage = "Registration Year cannot exceed the current date.")]
        public DateTime RegistrationYear { get; set; }

        [Required(ErrorMessage = "Transmission is required.")]
       
        public string Transmission { get; set; }

        [Required(ErrorMessage = "FuelType is required.")]
        
        public string Fuel { get; set; }

        
        public int Seat { get; set; }


        
        public float PricePerHour { get; set; }


        [Required(ErrorMessage = "City is required.")]
      
        public string City { get; set; }


        [Required(ErrorMessage = "Rating is required.")]
        public float Rating { get; set; }

        [Required]
        public byte[] CarImage { get; set; } // Byte array to store image data


        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
        public string Description { get; set; }

        public string OwnerEmail { get; set; }
    }

    public class InventoryCreateModel
    {
        [Required(ErrorMessage = "CarId is required.")]
        [StringLength(10, ErrorMessage = "CarId must be at most 10 characters.")]
        [RegularExpression(@"^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$", ErrorMessage = "CarId must have the format 'AB12AB1234'.")]
        public string CarId { get; set; }


        [Required(ErrorMessage = "CarBrand is required.")]
        public string CarBrand { get; set; }


        
        public string CarType { get; set; }


        [Required(ErrorMessage = "CarName is required.")]
        public string CarName { get; set; }


        [DataType(DataType.Date)]
        [Display(Name = "Registration Year")]
        [DateValidation(ErrorMessage = "Registration Year cannot exceed the current date.")]
        public DateTime RegistrationYear { get; set; }


        [Required(ErrorMessage = "Transmission is required.")]
       
        public string Transmission { get; set; }


       
        public string Fuel { get; set; }


        
        public int Seat { get; set; }


        
        public float PricePerHour { get; set; }


        [Required(ErrorMessage = "City is required.")]
       
        public string City { get; set; }


        [Required(ErrorMessage = "Rating is required.")]
        public float Rating { get; set; }

        [Required]
        public IFormFile Image { get; set; }


        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
        public string Description { get; set; }

        public string OwnerEmail { get; set; }
    }

    public class InventoryUpdateModel
    {



        [Required(ErrorMessage = "CarBrand is required.")]
        public string CarBrand { get; set; }



        public string CarType { get; set; }


        [Required(ErrorMessage = "CarName is required.")]
        public string CarName { get; set; }


        [DataType(DataType.Date)]
        [Display(Name = "Registration Year")]
        [DateValidation(ErrorMessage = "Registration Year cannot exceed the current date.")]
        public DateTime RegistrationYear { get; set; }


        [Required(ErrorMessage = "Transmission is required.")]

        public string Transmission { get; set; }



        public string Fuel { get; set; }



        public int Seat { get; set; }



        public float PricePerHour { get; set; }


        [Required(ErrorMessage = "City is required.")]
       
        public string City { get; set; }


        [Required(ErrorMessage = "Rating is required.")]
        public float Rating { get; set; }

        [Required]
        public IFormFile Image { get; set; }


        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
        public string Description { get; set; }

        public string OwnerEmail { get; set; }
    }


}
