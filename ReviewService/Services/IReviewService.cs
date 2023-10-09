using ReviewService.Model;

namespace ReviewService.Services
{
    public interface IReviewService
    {
        public Review AddReview(Review review);
        public bool UpdateReview(Review review);
        Task DeleteAysnc(string id);
        public List<Review> GetAllReviews();
        public List<Review> GetReviewbycarid(string id);

    }
}

