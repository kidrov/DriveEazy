using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ReservationService.DAL;
using ReservationService.Entities;
using ReservationService.Exceptions;
using ReservationService.Services;
using Microsoft.AspNetCore.Cors;

namespace ReservationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationServices _reservationService;
        private readonly IMongoCollection<Reservation> _reservations;

        public ReservationController(IReservationServices reservationService, IReservationDatabaseSettings settings)
        {
            _reservationService = reservationService;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _reservations = database.GetCollection<Reservation>(settings.ReservationsCollectionName);
        }

        [HttpPost]
        public IActionResult SaveReservation(Reservation reservation)
        {
            try
            {
                CheckCarAvailability(reservation.carId, reservation.reservationStartDate, reservation.reservationEndDate, reservation.rentedByEmailid);

                // Call the repository method or perform other operations
                _reservations.InsertOne(reservation);

                return Ok();
            }
            catch (CarAlreadyBookedException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (CarNotAvailableException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (CarAvailableException ex)
            {
                // Handle the exception and continue with saving the reservation                               
                _reservations.InsertOne(reservation);
                return Ok(ex.Message);
                // Call the repository method or perform other operations
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while saving the reservation: {ex.Message}");
            }
        }
        private void CheckCarAvailability(string carId, DateTime startDate, DateTime endDate, string rentedByEmailid)
        {
            var carAvailabilityFilter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Eq(r => r.carId, carId),
                Builders<Reservation>.Filter.Gte(r => r.reservationEndDate, startDate),
                Builders<Reservation>.Filter.Lte(r => r.reservationStartDate, endDate)
            );

            var conflictingReservation = _reservations.Find(carAvailabilityFilter).FirstOrDefault();
            if (conflictingReservation != null)
            {
                if (conflictingReservation.rentedByEmailid == rentedByEmailid)
                {
                    throw new CarAlreadyBookedException(
                        "The car is already booked by you during the specified reservation period.");
                }
                else
                {
                    throw new CarAlreadyBookedException(
                        $"The car is already booked by user '{conflictingReservation.rentedByEmailid}' during the specified reservation period.");
                }
            }
            else
            {
                var carAvailabilityFilter2 = Builders<Reservation>.Filter.And(
                    Builders<Reservation>.Filter.Eq(r => r.carId, carId),
                    Builders<Reservation>.Filter.Lte(r => r.reservationEndDate, startDate),
                    Builders<Reservation>.Filter.Gte(r => r.reservationStartDate, endDate)
                );

                var availableReservation = _reservations.Find(carAvailabilityFilter2).FirstOrDefault();
                if (availableReservation != null)
                {
                    throw new CarNotAvailableException("The car is not available during the specified reservation period.");
                }
                else
                {
                    throw new CarAvailableException("The car is available during the specified reservation period.");
                }
            }
        }


        [HttpGet("/upcoming")]
        public IActionResult GetAllUpcomingReservationsForUser(string rentedByEmailid)
        {
            var upcomingReservations = _reservationService.GetAllUpcomingReservationsForUser(rentedByEmailid);
            return Ok(upcomingReservations);
        }

        [HttpGet("/past")]
        public IActionResult GetPastReservationsForUser(string rentedByEmailid)
        {
            var pastReservations = _reservationService.GetPastReservationsForUser(rentedByEmailid);
            return Ok(pastReservations);
        }

        [HttpGet]
        public IActionResult GetAllReservations()
        {
            var allReservations = _reservationService.GetAllReservations();
            return Ok(allReservations);
        }

        /*
        [HttpGet("{reservationId}")]
        public IActionResult GetReservationById(int reservationId)
        {
            var reservation = _reservationService.GetReservationById(reservationId);
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }
        */
    }
}






