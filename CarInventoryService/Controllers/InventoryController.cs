using CarInventoryService.Models;
using CarInventoryService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace CarInventoryService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;
        private readonly ILogger<InventoryController> _logger;

        public InventoryController(IInventoryService inventoryService, ILogger<InventoryController> logger)
        {
            _inventoryService = inventoryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var inventories = await _inventoryService.GetAllAsync();
                return Ok(inventories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting inventory");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{carId}")]
        public async Task<IActionResult> GetByCarId(string carId)
        {
            try
            {
                var inventory = await _inventoryService.GetByCarId(carId);
                if (inventory == null)
                {
                    return NotFound("Inventory not found");
                }

                return Ok(inventory);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting inventory by carId");
                return StatusCode(500, "Internal Server Error");
            }
        }
        






        [HttpDelete("{carId}")]
        public async Task<IActionResult> Delete(string carId)
        {
            try
            {
                var existingInventory = await _inventoryService.GetByCarId(carId);
                if (existingInventory == null)
                {
                    return NotFound("Inventory not found");
                }

                await _inventoryService.DeleteAsync(carId);
                return Ok("Inventory deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting inventory");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] InventoryCreateModel model)
        {
            try
            {
                if (model == null || model.Image == null)
                {
                    return BadRequest("Invalid inventory data or image is missing");
                }
                var existingInventory = await _inventoryService.GetByCarId(model.CarId);
                if (existingInventory != null)
                {
                    return Conflict("Inventory with the same carId already exists");
                }

                byte[] imageBytes;
                using (var memoryStream = new MemoryStream())
                {
                    await model.Image.CopyToAsync(memoryStream);
                    imageBytes = memoryStream.ToArray();
                }

                var inventory = new Inventory
                {
                    CarId = model.CarId,
                    CarName = model.CarName,
                    CarBrand = model.CarBrand,
                    RegistrationYear = model.RegistrationYear, // Set the registration date
                    Transmission = model.Transmission,
                    Fuel = model.Fuel,
                    Seat = model.Seat,
                    PricePerHour = model.PricePerHour,
                    City = model.City,
                    Rating = model.Rating,
                    Description = model.Description,
                    CarImage = imageBytes,
                    CarType = model.CarType,
                    OwnerEmail= model.OwnerEmail,
                };

                await _inventoryService.CreateAsync(inventory);
                return CreatedAtAction(nameof(GetByCarId), new {carId = inventory.CarId }, 201);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating inventory");
                return StatusCode(200, "Ok");
            }
        }

        [HttpPut("{carId}")]
        public async Task<IActionResult> Update(string carId, [FromForm] InventoryUpdateModel model)
        {
            try
            {
                var existingInventory = await _inventoryService.GetByCarId(carId);
                if (existingInventory == null)
                {
                    return NotFound("Inventory not found");
                }

                // Create a new Inventory object with updated properties
                var updatedInventory = new Inventory
                {
                    CarId = existingInventory.CarId,
                    CarName = model.CarName,
                    CarBrand = model.CarBrand,
                    RegistrationYear = model.RegistrationYear,
                    Transmission = model.Transmission,
                    Fuel = model.Fuel,
                    Seat = model.Seat,
                    PricePerHour = model.PricePerHour,
                    City = model.City,
                    Rating = model.Rating,
                    Description = model.Description,
                    CarType = model.CarType,
                    OwnerEmail = model.OwnerEmail
                };

                // Update the image if a new one is provided
                if (model.Image != null)
                {
                    byte[] imageBytes;
                    using (var memoryStream = new MemoryStream())
                    {
                        await model.Image.CopyToAsync(memoryStream);
                        imageBytes = memoryStream.ToArray();
                    }

                    updatedInventory.CarImage = imageBytes;
                }

                await _inventoryService.Update(carId, updatedInventory);
                return Ok("Inventory updated successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating inventory: {ErrorMessage}", ex.Message);
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }


    }
}
    

