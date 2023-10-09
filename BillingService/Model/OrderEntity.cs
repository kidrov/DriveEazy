
using System.ComponentModel.DataAnnotations.Schema;

namespace BillingService.Model
{
    public class OrderEntity
    {

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public double Amount { get; set; }
        //public string   Currency
        [NotMapped]
        public string? OrderId { get; set; }
    }
}
