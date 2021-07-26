using Microsoft.Extensions.Configuration;
using RepairTrack.Models;
using RepairTrack.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Repositories
{
    public class IssueTicketRepository : BaseRepository, IIssueTicketRepository
    {
        public IssueTicketRepository(IConfiguration configuration) : base(configuration) { }
       

        public List<IssueTicket> GetAllIssueTicketsByInventoryId(int inventoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT it.Id, it.Issue, it.CreateDateTime, it.InventoryId, it.IsResolved
                            FROM IssueTicket it
                           LEFT JOIN Inventory i ON i.Id = it.InventoryId
                           WHERE i.Id = @inventoryId
                        
                    ";
                    cmd.Parameters.AddWithValue("@inventoryId", inventoryId);
                    var reader = cmd.ExecuteReader();
                    List<IssueTicket> issueTickets = new List<IssueTicket>();
                    while (reader.Read())
                    {
                        IssueTicket issueTicket = new IssueTicket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Issue = DbUtils.GetString(reader, "Issue"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                            IsResolved = DbUtils.GetBoolean(reader, "IsResolved")

                        };

                        issueTickets.Add(issueTicket);
                    }
                    reader.Close();

                    return issueTickets;
                }

            }

        }

        public IssueTicket GetIssueTicketById(int issueTicketId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT it.Id, it.Issue, it.CreateDateTime, it.InventoryId, it.IsResolved
                            FROM IssueTicket it
                           
                           WHERE it.Id = @issueTicketId
                        
                    ";
                    DbUtils.AddParameter(cmd,"@IssueTicketId", issueTicketId);
                    var reader = cmd.ExecuteReader();
                    IssueTicket issueTicket = null;
                    if (reader.Read())
                    {
                         issueTicket = new IssueTicket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Issue = DbUtils.GetString(reader, "Issue"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                            IsResolved = DbUtils.GetBoolean(reader, "IsResolved")

                        };

                       
                    }
                    reader.Close();

                    return issueTicket;
                }

            }

        }

    }
}
