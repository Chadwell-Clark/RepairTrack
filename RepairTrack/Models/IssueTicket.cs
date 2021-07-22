using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Models
{
    public class IssueTicket
    {
        public int Id { get; set; }

        [Required]
        public int InventoryId { get; set; }
        [Required]
        [MaxLength(500)]
        public string Issue { get; set; }
        [Required]
        public DateTime CreateDateTime { get; set; }
        [Required]
        public bool IsResolved { get; set; }
    }
}
