using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RepairTrack.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(35)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(35)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [Required]
        public bool IsActive { get; set; }
        public UserType UserType { get; set; }



        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
