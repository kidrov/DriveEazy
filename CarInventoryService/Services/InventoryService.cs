using CarInventoryService.Data;
using CarInventoryService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace CarInventoryService.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IMongoCollection<Inventory> _inventoryCollection;

        public InventoryService(IOptions<InventoryDbSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _inventoryCollection = database.GetCollection<Inventory>("Inventory");
        }

        public async Task<IEnumerable<Inventory>> GetAllAsync()
        {
            return await _inventoryCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Inventory> GetByCarId(string carId)
        {
            return await _inventoryCollection.Find(i => i.CarId == carId).FirstOrDefaultAsync();
        }
        

        public async Task CreateAsync(Inventory inventory)
        {
           
            await _inventoryCollection.InsertOneAsync(inventory);
        }

        public async Task Update(string carId, Inventory updatedInventory)
        {
            var filter = Builders<Inventory>.Filter.Eq(i => i.CarId, carId);
            // Exclude _id field from updatedInventory
            var update = Builders<Inventory>.Update
                .Set(i => i.CarName, updatedInventory.CarName)
                .Set(i => i.CarBrand, updatedInventory.CarBrand)
                .Set(i => i.CarType, updatedInventory.CarType)
                .Set(i => i.RegistrationYear, updatedInventory.RegistrationYear)
                .Set(i => i.Transmission, updatedInventory.Transmission)
                .Set(i => i.Fuel, updatedInventory.Fuel)
                .Set(i => i.Seat, updatedInventory.Seat)
                .Set(i => i.PricePerHour, updatedInventory.PricePerHour)
                .Set(i => i.City, updatedInventory.City)
                .Set(i => i.Rating, updatedInventory.Rating)
                .Set(i => i.Description, updatedInventory.Description)
                .Set(i => i.OwnerEmail, updatedInventory.OwnerEmail);

            // Conditionally update the CarImage field
            if (updatedInventory.CarImage != null)
            {
                update = update.Set(i => i.CarImage, updatedInventory.CarImage);
            }

            await _inventoryCollection.UpdateOneAsync(filter, update);
        }


        public async Task DeleteAsync(string carId)
        {
            var filter = Builders<Inventory>.Filter.Eq(i => i.CarId,carId);
            await _inventoryCollection.DeleteOneAsync(filter);
        }
    }
}
