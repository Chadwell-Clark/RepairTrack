using RepairTrack.Models;
using System.Collections.Generic;

namespace RepairTrack.Repositories
{
    public interface IIssueTicketRepository
    {
        List<IssueTicket> GetAllIssueTicketsByInventoryId(int inventoryId);
    }
}