using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using BillingService.Model;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace BillingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderApiController : ControllerBase
    {  //private readonly _repo orderRepository;
        [HttpPost("initiateorder")]
        public IActionResult InitiateOrder( [FromBody]OrderEntity order)
        {
            if (order == null)
            {
                return BadRequest("Invalid order data.");
            }

            //Random random = new Random();
            //string transactionId = random.Next(0, 1000).ToString();
            Dictionary<string, object> input = new Dictionary<string, object>
            {
                { "amount", Convert.ToDecimal(order.Amount) * 100 }, // this amount should be the same as the transaction amount
                { "currency", "INR" },
            };

            string key = "rzp_test_0lqA5Pp4Li6KYq";
            string secret = "KaOI2gFcJKphQsU7jc308osp";

            RazorpayClient client = new RazorpayClient(key, secret);

            Razorpay.Api.Order razorpayOrder = client.Order.Create(input);
          
            string orderId = razorpayOrder["id"].ToString();
            //_repo.AddOrder(orderID)
            return Ok(new { OrderId = orderId });
        }
        [HttpPost("checkout")]
        
        public IActionResult Checkout([FromBody] Checkout checkout )
        {
            if (checkout == null)
            {
                return BadRequest("Invalid payment data.");
            }

            string key = "rzp_test_0lqA5Pp4Li6KYq";
            string secret = "KaOI2gFcJKphQsU7jc308osp";

            RazorpayClient client = new RazorpayClient(key, secret);
            //client.Order.
            return Ok(checkout);
            

                
            
        }

        [HttpPost("payment")]
        public IActionResult Payment([FromBody] PaymentData paymentData)
        {
            if (paymentData == null)
            {
                return BadRequest("Invalid payment data.");
            }
            Dictionary<string, string> attributes = new Dictionary<string, string>();

            attributes.Add("razorpay_payment_id", paymentData.razorpay_payment_Id);
            attributes.Add("razorpay_order_id", paymentData.razorpay_orderId);
            attributes.Add("razorpay_signature", paymentData.razorpay_signature);

            Utils.verifyPaymentSignature(attributes);

            string key = "rzp_test_0lqA5Pp4Li6KYq";
            string secret = "KaOI2gFcJKphQsU7jc308osp";
            RazorpayClient client = new RazorpayClient(key,secret);

           
            OrderEntity orderDetails = new OrderEntity
            {
                
                OrderId = paymentData.razorpay_orderId
            };

            return Ok(new { Message = "Payment successful.", OrderDetails = orderDetails });
        }
        private bool VerifyPaymentSignature(PaymentData paymentData)
        {
            string secretKey = "KaOI2gFcJKphQsU7jc308osp";

            string dataToSign = paymentData.razorpay_payment_Id + "|" + paymentData.razorpay_orderId;

            using (var hmac = new System.Security.Cryptography.HMACSHA256(System.Text.Encoding.UTF8.GetBytes(secretKey)))
            {
                byte[] hashBytes = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dataToSign));

                
                string calculatedSignature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();


                return calculatedSignature == paymentData.razorpay_signature;

            }
        }
      
       
       
     }
       
 }
 