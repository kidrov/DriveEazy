using Microsoft.AspNetCore.Cors;
namespace ReservationService
{
    public interface IReservationDatabaseSettings
    {
        string ReservationsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
namespace ReservationService
{
    public class ReservationDatabaseSettings : IReservationDatabaseSettings
    {
        public string? ReservationsCollectionName { get; set; }
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
    }
}
