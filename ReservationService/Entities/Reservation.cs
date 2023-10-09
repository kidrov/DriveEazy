using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Microsoft.AspNetCore.Cors;

namespace ReservationService.Entities
{
    [Serializable, BsonIgnoreExtraElements]
    public class Reservation
    {
        private static int lastReservationId = 0;
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }


        public string rentedByEmailid { get; set; }
        
        
        public DateTime reservationDate { get; set; }

       
        public DateTime reservationStartDate { get; set; }

       
        public DateTime reservationEndDate { get; set; }

        public string carId { get; set; }
        //public Reservation()
        //{
            //reservationId = GenerateNewReservationId();
        //}

        //private static int GenerateNewReservationId()
        //{
            // Increment the reservation ID counter by 1 and return the new value
            //return ++lastReservationId;
        //}


    }

}
