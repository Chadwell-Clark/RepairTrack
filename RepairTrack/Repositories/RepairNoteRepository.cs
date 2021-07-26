using Microsoft.Extensions.Configuration;
using RepairTrack.Controllers;
using RepairTrack.Models;
using RepairTrack.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Repositories
{
    public class RepairNoteRepository : BaseRepository, IRepairNoteRepository
    {
        public RepairNoteRepository(IConfiguration configuration) : base(configuration) { }
        public List<RepairNote> GetAllRepairNotesByIssueTicketId(int issueTicketId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT rn.Id, rn.Note, rn.partsNeeded, rn.CreateDateTime, rn.IssueTicketId, rn.UserProfileId, rn.PartsOrdered,
                        up.FirstName, up.LastName
                            FROM RepairNote rn
                           LEFT JOIN IssueTicket it ON it.Id = rn.IssueTicketId
                           LEFT JOIN UserProfile up ON up.id = rn.UserProfileId
                           WHERE it.Id = @issueTicketId
                        
                    ";
                    cmd.Parameters.AddWithValue("@issueTicketId", issueTicketId);
                    var reader = cmd.ExecuteReader();
                    List<RepairNote> repairNotes = new List<RepairNote>();
                    while (reader.Read())
                    {
                        RepairNote repairNote = new RepairNote()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Note = DbUtils.GetString(reader, "Note"),
                            PartsNeeded = DbUtils.GetString(reader, "PartsNeeded"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IssueTicketId = DbUtils.GetInt(reader, "IssueTicketId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PartsOrdered = DbUtils.GetInt(reader, "PartsOrdered"),
                            UserProfile = new UserProfile()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            }

                        };

                        repairNotes.Add(repairNote);
                    }
                    reader.Close();

                    return repairNotes;
                }

            }

        }


    }
}
