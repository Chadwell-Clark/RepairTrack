using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Models
{
    public class UserType
    {
        
            public int Id { get; set; }

            [Required]
            [MaxLength(20)]
            public string Name { get; set; }

            public static int ADMIN_ID => 1;
            public static int TECHNICIAN_ID => 2;
        
    }
}
