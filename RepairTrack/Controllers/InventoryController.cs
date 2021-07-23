using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }

}
