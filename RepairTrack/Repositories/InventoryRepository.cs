using Microsoft.Extensions.Configuration;
using RepairTrack.Models;
using RepairTrack.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }
        public List<Inventory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Manufacturer, 
                                Model, SerialNumber, FirmWare, ImageLoc, InCommission
                              
                            FROM Inventory 
                           
                        
                    ";

                    var reader = cmd.ExecuteReader();

                    List<Inventory> inventoryItems = new List<Inventory>();
                    while (reader.Read())
                    {
                        Inventory inventory = new Inventory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Manufacturer = DbUtils.GetString(reader, "Manufacturer"),
                            Model = DbUtils.GetString(reader, "Model"),
                            SerialNumber = DbUtils.GetString(reader, "SerialNumber"),
                            FirmWare = DbUtils.GetString(reader, "FirmWare"),
                            ImageLoc = DbUtils.GetString(reader, "ImageLoc"),
                            InCommission = DbUtils.GetBoolean(reader, "InCommission")
                        };
                        inventoryItems.Add(inventory);
                    }

                    reader.Close();

                    return inventoryItems;
                }

            }


        }

        public Inventory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Manufacturer, 
                                Model, SerialNumber, FirmWare, ImageLoc, InCommission
                              
                            FROM Inventory 
                           
                           WHERE Id = @id
                        
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Inventory inventory = new Inventory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Manufacturer = DbUtils.GetString(reader, "Manufacturer"),
                            Model = DbUtils.GetString(reader, "Model"),
                            SerialNumber = DbUtils.GetString(reader, "SerialNumber"),
                            FirmWare = DbUtils.GetString(reader, "FirmWare"),
                            ImageLoc = DbUtils.GetString(reader, "ImageLoc"),
                            InCommission = DbUtils.GetBoolean(reader, "InCommission")
                        };
                        reader.Close();

                        return inventory;
                    }
                    reader.Close();
                    return null;
                }

            }

        }

        //public List<IssueTicket> GetAllIssueTicketsByInventoryId(int inventoryId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                  SELECT it.Id, it.Issue, it.CreateDateTime, it.InventoryId, it.IsResolved
        //                    FROM IssueTicket it
        //                   LEFT JOIN Inventory i ON i.Id = it.InventoryId
        //                   WHERE i.Id = @inventoryId
                        
        //            ";
        //            cmd.Parameters.AddWithValue("@inventoryId", inventoryId);
        //            var reader = cmd.ExecuteReader();
        //            List<IssueTicket> issueTickets = new List<IssueTicket>();
        //            while (reader.Read())
        //            {
        //                IssueTicket issueTicket = new IssueTicket()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    Issue = DbUtils.GetString(reader, "Issue"),
        //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
        //                    InventoryId = DbUtils.GetInt(reader, "InventoryId"),
        //                    IsResolved = DbUtils.GetBoolean(reader, "IsResolved")
                            
        //                };

        //            issueTickets.Add(issueTicket);
        //            }
        //            reader.Close();
                   
        //            return issueTickets;
        //        }

        //    }

        //}

    }
}
