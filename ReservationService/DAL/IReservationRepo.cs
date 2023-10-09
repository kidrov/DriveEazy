using ReservationService.Entities;
using Microsoft.AspNetCore.Cors;

namespace ReservationService.DAL
{
    public interface IReservationRepo
    {
        void SaveReservation(Reservation reservation);
        List<Reservation> GetAllUpcomingReservationsForUser(string rentedByEmailid);
        List<Reservation> GetPastReservationsForUser(string rentedByEmailid);
        //Reservation GetReservationById(int reservationId);

        List<Reservation> GetAllReservations();
    }
}

