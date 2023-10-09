using DocumentFormat.OpenXml.Office2010.Excel;
using MongoDB.Driver;
using ReviewService.Model;

namespace ReviewService.Repo
{
    public class ReviewRepo
    {
        private readonly IMongoCollection<Review> _reviews;
        public ReviewRepo(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("mongoDB"));
            var database = client.GetDatabase("YourDatabaseName");
            _reviews = database.GetCollection<Review>("Reviews");

        }
        public List<Review> GetReviewList()
        {
            return _reviews.Find(review => true).ToList();
        }
        public async Task<Review> AddReview(Review review)
        {
            await _reviews.InsertOneAsync(review);
            return review;
        }
        //public async Task<bool> Delete(string reviewID)
        //{
        //    //var review=await _reviews.Find(ObjectId.Parse(reviewID));
        //    //if (review != null)
        //    //{
        //    //    await _reviews.DeleteOneAsync(x => x.Id == reviewID);
        //    //}
        public async Task DeleteAysnc(string id) =>
        await _reviews.DeleteOneAsync(a => a.Id == id);

        public async Task<Review> Replace(Review review)

        {
            await _reviews.ReplaceOneAsync(review.Id, review);
            return review;


        }
        public List<Review> GetReviewById(string carId)
        {
            List<Review> temp = _reviews.Find(x => x.CarId == carId).ToList();
            return temp;
        }


    }


}