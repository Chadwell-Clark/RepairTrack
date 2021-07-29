using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepairTrack.Models;
using Microsoft.AspNetCore.Http;
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
    public class IssueTicketController : ControllerBase
    {
        private readonly IIssueTicketRepository _issueTicketRepository;
        public IssueTicketController(IIssueTicketRepository issueTicketRepository)
        {
            _issueTicketRepository = issueTicketRepository;
        }

        [HttpGet]

        public IActionResult GetAllIssueTickets()
        {
            var issueTickets = _issueTicketRepository.GetAllIssueTickets();
            if (issueTickets == null)
            {
                issueTickets = new List<IssueTicket>();
                return Ok(issueTickets);
            }
            return Ok(issueTickets);

        }

        [HttpGet("GetByInventoryId/{id}")]

        public IActionResult GetIssueTicketsById(int id)
        {
            var issueTickets = _issueTicketRepository.GetAllIssueTicketsByInventoryId(id);
            if (issueTickets == null)
            {
                issueTickets = new List<IssueTicket>();
                return Ok(issueTickets);
            }
            return Ok(issueTickets);

        }

        [HttpGet("{id}")]
        public IActionResult GetIssueTicketById(int id)
        {
            var issueTicket = _issueTicketRepository.GetIssueTicketById(id);
            if (issueTicket == null)
            {
                return NotFound();
            }
            return Ok(issueTicket);
        }

        [HttpPost]
        public IActionResult IssueTicket(IssueTicket issueTicket)
        {
            issueTicket.CreateDateTime = DateTime.Now;

            var id = _issueTicketRepository.Add(issueTicket);

            return Ok(id);
        }

        [HttpPut("{id}")]
        public IActionResult IssueTicket(int id, IssueTicket issueTicket)
        {
            if (id != issueTicket.Id)
            {
                return BadRequest();
            }
            _issueTicketRepository.Update(issueTicket);
            return Ok(issueTicket);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _issueTicketRepository.Delete(id);
            return NoContent();
        }

    }
}

