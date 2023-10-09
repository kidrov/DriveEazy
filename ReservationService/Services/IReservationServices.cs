using Microsoft.AspNetCore.Cors;
using ReservationService.Entities;

namespace ReservationService.Services
{
    public interface IReservationServices
    {
        void SaveReservation(Reservation reservation);
        List<Reservation> GetAllUpcomingReservationsForUser(string rentedByEmailid);
        List<Reservation> GetPastReservationsForUser(string rentedByEmailid);
        //Reservation GetReservationById(int reservationId);

        List<Reservation> GetAllReservations();

    }
}
