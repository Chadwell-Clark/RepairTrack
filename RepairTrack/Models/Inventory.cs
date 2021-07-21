using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Manufacturer { get; set; }
        [Required]
        [MaxLength(50)] 
        public string Model{get;set;}

        [Required]
        [MaxLength(50)]
        public string SerialNumber{get;set;}

        [MaxLength(50)]
        public string Firmware{ get; set; }

        public string ImageLoc{ get; set; }

        [Required]
        public bool InCommission { get; set; }

    }
}
