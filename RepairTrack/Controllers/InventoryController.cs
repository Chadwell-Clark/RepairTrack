using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairTrack.Models;
using RepairTrack.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {

        private readonly IInventoryRepository _inventoryRepository;

        public InventoryController(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet]
        public IActionResult GetAllInventory()
        {
            return Ok(_inventoryRepository.GetAll());
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetInventoryById(int id)
        {
            var inventory = _inventoryRepository.GetById(id);
            if (inventory == null)
            {
                return NotFound();
            }
            return Ok(inventory);
        }

        [HttpPost]
        public IActionResult Inventory(Inventory inventory)
        {
            if (string.IsNullOrWhiteSpace(inventory.FirmWare))
            {
                inventory.FirmWare = null;
            }
            if (string.IsNullOrWhiteSpace(inventory.ImageLoc))
            {
                inventory.ImageLoc = null;
            }

            var id = _inventoryRepository.Add(inventory);

            return Ok(id);
        }

        [HttpPut("{id}")]
        public IActionResult Inventory(int id, Inventory inventory)
        {
            if (id != inventory.Id)
            {
                return BadRequest();
            }
            _inventoryRepository.Update(inventory);
            return Ok(inventory);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _inventoryRepository.Delete(id);
            return NoContent();
        }
    }

}
