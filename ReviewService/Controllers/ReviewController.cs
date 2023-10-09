using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReviewService.Model;
using ReviewService.Repo;
using ReviewService.Services;

namespace ReviewService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _service;
        public ReviewController(IReviewService service)
        {
            _service = service;
        }
        [HttpGet]
        public List<Review> GetReviews()
        {
            return _service.GetAllReviews();

        }
        [HttpPost]
        public Review PostReview(Review review)
        {
            return (_service.AddReview(review));

        }
        [HttpDelete("{reviewId}")]
        public IActionResult DeleteReview(string reviewId)
        {
            _service.DeleteAysnc(reviewId);
            return Ok();
        }
        [HttpPut]
        public IActionResult UpdateReview(Review review)
        {
            _service.UpdateReview(review);
            return Ok();
        }

        [HttpGet("{carid}")]
        public IActionResult GetReviewByCarID(string carid)
        {
            
            return Ok(_service.GetReviewbycarid(carid));    
        }
    }
}