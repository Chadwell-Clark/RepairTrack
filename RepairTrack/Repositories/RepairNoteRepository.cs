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
                    DbUtils.AddParameter(cmd, "@issueTicketId", issueTicketId);
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

        public RepairNote GetRepairNoteById(int repairNoteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT rn.Id, rn.Note, rn.partsNeeded, rn.CreateDateTime, rn.IssueTicketId, rn.UserProfileId, rn.PartsOrdered,
                                up.FirstName, up.LastName, it.Id AS IssueNum, it.Issue, it.CreateDAteTime AS IssueDatetime, it.InventoryId,
                                it.IsResolved, i.Manufacturer, i.Model, i.SerialNumber, i.FirmWare, i.ImageLoc, i.InCommission
                          FROM RepairNote rn
                            LEFT JOIN UserProfile up ON up.id = rn.UserProfileId
                            LEFT JOIN IssueTicket it ON it.id = rn.IssueTicketId
                            LEFT JOIN Inventory i ON i.id = it.InventoryId
                           WHERE rn.Id = @repairNoteId
                    ";
                    DbUtils.AddParameter(cmd, "@repairNoteId", repairNoteId);

                    var reader = cmd.ExecuteReader();
                    RepairNote repairNote = null;
                    if (reader.Read())
                    {
                        repairNote = new RepairNote()
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
                            },
                            IssueTicket = new IssueTicket()
                            {
                                Id = DbUtils.GetInt(reader, "IssueNum"),
                                Issue = DbUtils.GetString(reader, "Issue"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "IssueDateTime"),
                                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                                IsResolved = DbUtils.GetBoolean(reader, "IsResolved"),
                                Inventory = new Inventory()
                                {
                                    Id = DbUtils.GetInt(reader, "InventoryId"),
                                    Manufacturer = DbUtils.GetString(reader, "Manufacturer"),
                                    Model = DbUtils.GetString(reader, "Model"),
                                    SerialNumber = DbUtils.GetString(reader, "SerialNumber"),
                                    FirmWare = DbUtils.GetString(reader, "FirmWare"),
                                    ImageLoc = DbUtils.GetString(reader, "ImageLoc"),
                                    InCommission = DbUtils.GetBoolean(reader, "InCommission")

                                }

                            }
                        };
                        }
                    reader.Close();

                    return repairNote;
                }

            }

        }

        public RepairNote GetRepairNote(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT rn.Id, rn.Note, rn.partsNeeded, rn.CreateDateTime, rn.IssueTicketId, rn.UserProfileId, rn.PartsOrdered
                                
                          FROM RepairNote rn
                            
                           WHERE rn.Id = @Id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", Id);

                    var reader = cmd.ExecuteReader();
                    RepairNote repairNote = null;
                    if (reader.Read())
                    {
                        repairNote = new RepairNote()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Note = DbUtils.GetString(reader, "Note"),
                            PartsNeeded = DbUtils.GetString(reader, "PartsNeeded"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IssueTicketId = DbUtils.GetInt(reader, "IssueTicketId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PartsOrdered = DbUtils.GetInt(reader, "PartsOrdered"),
 
                        };
                    }
                    reader.Close();

                    return repairNote;
                }

            }

        }
        public int Add(RepairNote repairNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO RepairNote (Note, PartsNeeded, CreateDateTime, IssueTicketId, UserProfileId, PartsOrdered)
                        OUTPUT INSERTED.ID
                        VALUES (@Note, @PartsNeeded, @CreateDateTime, @IssueTicketId, @UserProfileId, @PartsOrdered)";

                    DbUtils.AddParameter(cmd, "@Note", repairNote.Note);
                    DbUtils.AddParameter(cmd, "@PartsNeeded", repairNote.PartsNeeded);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", repairNote.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@IssueTicketId", repairNote.IssueTicketId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", repairNote.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PartsOrdered", repairNote.PartsOrdered);

                    repairNote.Id = (int)cmd.ExecuteScalar();
                }

                return repairNote.Id;
            }
        }

        public void Update(RepairNote repairNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE RepairNote 
                            SET     Note =@Note, 
                                    PartsNeeded = @PartsNeeded, 
                                    CreateDateTime =  @CreateDateTime,
                                    IssueTicketId = @IssueTicketId, 
                                    UserProfileId = @UserProfileId, 
                                    PartsOrdered = @PartsOrdered
                            WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Note", repairNote.Note);
                    DbUtils.AddParameter(cmd, "@PartsNeeded", repairNote.PartsNeeded);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", repairNote.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@IssueTicketId", repairNote.IssueTicketId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", repairNote.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PartsOrdered", repairNote.PartsOrdered);
                    DbUtils.AddParameter(cmd, "@Id", repairNote.Id);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM RepairNote
                            WHERE id = @id";

                    
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }


    }
}
