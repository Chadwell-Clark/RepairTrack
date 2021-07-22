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
                                Model, SerialNumber, FirmWare, ImageLoc
                              
                            FROM Inventory 
                           
                           WHERE InCommission = 1
                        
                    ";

                    var reader = cmd.ExecuteReader();

                    var inventory = new List<Inventory>();
                    while (reader.Read())
                    {
                        inventory.Add(new Inventory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Manufacturer = DbUtils.GetString(reader, "Manufacturer"),
                            Model = DbUtils.GetString(reader, "Model"),
                            SerialNumber = DbUtils.GetString(reader, "SerialNumber"),
                            FirmWare = DbUtils.GetString(reader, "FirmWare"),
                            ImageLoc = DbUtils.GetString(reader, "ImageLoc")
                           

                        });
                    }

                    reader.Close();

                    return inventory;
                }

            }


        }
    }
}
