using RepairTrack.Models;
using System.Collections.Generic;

namespace RepairTrack.Repositories
{
    public interface IRepairNoteRepository
    {
        List<RepairNote> GetAllRepairNotesByIssueTicketId(int issueTicketId);

        RepairNote GetRepairNoteById(int repairNoteId);

        RepairNote GetRepairNote(int Id);

        int  Add(RepairNote repairNote);


        void Update(RepairNote repairNote);

        void Delete(int id);

    }
}