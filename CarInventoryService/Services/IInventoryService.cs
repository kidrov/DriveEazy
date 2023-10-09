using CarInventoryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarInventoryService.Services
{
    public interface IInventoryService
    {
        Task<IEnumerable<Inventory>> GetAllAsync();
        Task<Inventory> GetByCarId(string carId);
        Task CreateAsync(Inventory inventory);
        Task Update(string carId, Inventory updatedInventory);
        Task DeleteAsync(string carId);
       
    }
}
