using ReservationService.Entities;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using MongoDB.Driver;

namespace ReservationService.DAL
{
    public class ReservationRepo : IReservationRepo
    {
        private readonly IMongoCollection<Reservation> _reservations;

        public ReservationRepo(IReservationDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _reservations = database.GetCollection<Reservation>(settings.ReservationsCollectionName);
        }

        public void SaveReservation(Reservation reservation)
        {
            try
            {
                _reservations.InsertOne(reservation);
                Console.WriteLine("Reservation saved successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while saving the reservation: {ex.Message}");
            }
        }

        public List<Reservation> GetAllUpcomingReservationsForUser(string rentedByEmailid)
        {
            var filter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Eq(r => r.rentedByEmailid, rentedByEmailid),
                Builders<Reservation>.Filter.Gte(r => r.reservationStartDate, DateTime.UtcNow)
            );

            return _reservations.Find(filter).ToList();
        }
        public List<Reservation> GetPastReservationsForUser(string rentedByEmailid)
        {
            var filter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Eq(r => r.rentedByEmailid, rentedByEmailid),
                Builders<Reservation>.Filter.Lt(r => r.reservationEndDate, DateTime.UtcNow)
            );
            return _reservations.Find(filter).ToList();
        }

        public List<Reservation> GetAllReservations()
        {
            return _reservations.Find(_ => true).ToList();
        }
        /*
public Reservation GetReservationById(int reservationId)
{
   var filter = Builders<Reservation>.Filter.Eq(r => r.reservationId, reservationId);
   return _reservations.Find(filter).FirstOrDefault();
}
*/
    }

}