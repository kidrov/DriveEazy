namespace BillingService.Model
{
    public class PaymentData
    {
        public string razorpay_payment_Id { get; set; }
        public string razorpay_signature { get; set; }
        public string razorpay_orderId { get; set; }
    }
}
