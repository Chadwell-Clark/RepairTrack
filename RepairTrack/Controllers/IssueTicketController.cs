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
    public class IssueTicketController : ControllerBase
    {

        private readonly IIssueTicketRepository _issueTicketRepository;

        public IssueTicketController(IIssueTicketRepository issueTicketRepository)
        {
            _issueTicketRepository = issueTicketRepository;
        }

        [HttpGet("{id}")]

        public IActionResult GetIssueTicketsById(int id)
        {
            var issueTickets = _issueTicketRepository.GetAllIssueTicketsByInventoryId(id);
            if (issueTickets == null)
            {
                return NotFound();
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

