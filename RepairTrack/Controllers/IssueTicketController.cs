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
    public class IssueTicketController : ControllerBase
    {
        private readonly IIssueTicketRepository _issueTicketRepository;
        public IssueTicketController(IIssueTicketRepository issueTicketRepository)
        {
            _issueTicketRepository = issueTicketRepository;
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

        //[HttpGet]
        //public IActionResult GetAllInventory()
        //{
        //    return Ok(_issueTicketRepository.GetAll());
        //}

        //[HttpGet("{id}")]
        //public IActionResult GetInventoryById(int id)
        //{
        //    var issueTicket = _issueTicketRepository.GetById(id);
        //    if (issueTicket == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(issueTicket);
        //}
    }

}

