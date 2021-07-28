using RepairTrack.Models;
using System.Collections.Generic;

namespace RepairTrack.Controllers
{
    public interface IRepairNoteRepository
    {
        List<RepairNote> GetAllRepairNotesByIssueTicketId(int issueTicketId);

        RepairNote GetRepairNoteById(int repairNoteId);

        int  Add(RepairNote repairNote);
    }
}