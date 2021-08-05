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

        public int Add(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Inventory (Manufacturer, Model, SerialNumber, FirmWare, ImageLoc, InCommission)
                        OUTPUT INSERTED.ID
                        VALUES (@Manufacturer,  @Model, @SerialNumber,  @FirmWare, @ImageLoc, @InCommission)";

                    DbUtils.AddParameter(cmd, "@Manufacturer", inventory.Manufacturer);
                    DbUtils.AddParameter(cmd, "@Model", inventory.Model);
                    DbUtils.AddParameter(cmd, "@SerialNumber", inventory.SerialNumber);
                    DbUtils.AddParameter(cmd, "@FirmWare", inventory.FirmWare);
                    DbUtils.AddParameter(cmd, "@ImageLoc", inventory.ImageLoc);
                    DbUtils.AddParameter(cmd, "@InCommission", inventory.InCommission);

                    inventory.Id = (int)cmd.ExecuteScalar();
                }

                return inventory.Id;
            }
        }

        public void Update(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Inventory 
                            SET     Manufacturer = @Manufacturer, 
                                    Model =  @Model,
                                    SerialNumber = @SerialNumber, 
                                    FirmWare = @FirmWare,
                                    ImageLoc = @ImageLoc,
                                    InCommission = @InCommission

                            WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Manufacturer", inventory.Manufacturer);
                    DbUtils.AddParameter(cmd, "@Model", inventory.Model);
                    DbUtils.AddParameter(cmd, "@SerialNumber", inventory.SerialNumber);
                    DbUtils.AddParameter(cmd, "@FirmWare", inventory.FirmWare);
                    DbUtils.AddParameter(cmd, "@ImageLoc", inventory.ImageLoc);
                    DbUtils.AddParameter(cmd, "@InCommission", inventory.InCommission);
                    DbUtils.AddParameter(cmd, "@Id", inventory.Id);

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
                        
                        DELETE FROM RepairNote WHERE IssueTicketId = (Select Id FROM IssueTicket Where InventoryId = @id)
                        DELETE FROM IssueTicket WHERE InventoryId = @id
                        DELETE FROM Inventory WHERE id = @id";


                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

    }
}
