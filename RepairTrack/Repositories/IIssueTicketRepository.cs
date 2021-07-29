using RepairTrack.Models;
using System.Collections.Generic;

namespace RepairTrack.Repositories
{
    public interface IIssueTicketRepository
    {
        List<IssueTicket> GetAllIssueTickets();
        List<IssueTicket> GetAllIssueTicketsByInventoryId(int inventoryId);

        IssueTicket GetIssueTicketById(int issueTicketId);
        int Add(IssueTicket issueTicket);

        void Update(IssueTicket issueTicket);

        void Delete(int id);
    }
}