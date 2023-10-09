using System;
using System.ComponentModel.DataAnnotations;

namespace CarInventoryService.Validation
{
    public class DateValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime registrationDate)
            {
                // Get the current date
                var currentDate = DateTime.Now.Date;

                // Compare the registration date with the current date
                if (registrationDate <= currentDate)
                {
                    return ValidationResult.Success;
                }
            }

            // Customize the error message
            var errorMessage = $"The {validationContext.DisplayName} cannot be set to a date in the future.";
            return new ValidationResult(errorMessage);
        }
    }
}
