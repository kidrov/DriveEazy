using ReviewService.Model;
using ReviewService.Repo;

namespace ReviewService.Services
{
    public class ReviewServicenew : IReviewService
    {
        private readonly ReviewRepo _reviewRepository;

        public ReviewServicenew(ReviewRepo reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public List<Review> GetAllReview()
        {
            return _reviewRepository.GetReviewList();
        }

        //public Review GetReviewById(int id)
        //{
        //    return _reviewRepository.GetReviewById(id);
        //}


        public Review AddReview(Review review)
        {
            _reviewRepository.AddReview(review);
            return review;
        }

        public bool UpdateReview(Review review)
        {
            _reviewRepository.Replace(review);
            return true;
        }

        public async Task DeleteAysnc(string id)
        {
            await _reviewRepository.DeleteAysnc(id);
        }

        public List<Review> GetAllReviews()
        {
            return _reviewRepository.GetReviewList();

        }
        public List<Review> GetReviewbycarid(string id)
        {
            return _reviewRepository.GetReviewById(id);   
        }
    }
}

    