using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ReviewService.Model

{


    public class Review
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public enum Rating { get, set, }

        public string Email { get; set; }
        public string CarId { get; set; }
    }
}