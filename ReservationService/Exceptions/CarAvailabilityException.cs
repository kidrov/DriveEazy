using Microsoft.AspNetCore.Cors;
namespace ReservationService.Exceptions
{
    public class CarAlreadyBookedException : Exception
    {
        public CarAlreadyBookedException(string message)
            : base(message)
        {
        }
    }
    public class CarNotAvailableException : Exception
    {
        public CarNotAvailableException(string message)
            : base(message)
        {
        }
    }

    public class CarAvailableException : Exception
    {
        public CarAvailableException(string message)
            : base(message)
        {
        }
    }
}
