namespace BillingService.Model
{
    public class Checkout
    {
        public string OrderId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string razorkey { get; set; }
    }
}
