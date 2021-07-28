using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Models
{
    public class RepairNote
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Note { get; set; }

        public string PartsNeeded { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int IssueTicketId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public int PartsOrdered { get; set; }

        public UserProfile UserProfile { get; set; }

        public IssueTicket IssueTicket { get; set; }

        //Calculated Property
        public string DateCreated
        {
            get
            {
                return CreateDateTime.ToString("MM/dd/yyyy h:mm tt");
            }
        }
    }
}
