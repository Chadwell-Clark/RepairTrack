using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairTrack.Models;
using System;
using System.Collections.Generic;
using RepairTrack.Repositories;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RepairTrack.Controllers
{   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RepairNoteController : ControllerBase
    {
        private readonly IRepairNoteRepository _repairNoteRepository;
        public RepairNoteController(IRepairNoteRepository repairNoteRepository)
        {
            _repairNoteRepository = repairNoteRepository;
        }
        

        // GET api/<RepairNoteController>/5
        [HttpGet("GetByIssueTicketId/{id}")]
        public IActionResult GetRepairNotesById(int id)
        {
            var repairNotes = _repairNoteRepository.GetAllRepairNotesByIssueTicketId(id);
            if (repairNotes == null)
            {
                repairNotes = new List<RepairNote>();
                return Ok(repairNotes);
            }
            return Ok(repairNotes);
        }

       
    }
}
