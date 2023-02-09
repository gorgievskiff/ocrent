using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataTransferObjects
{
    public class LoginDTO
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public int UserId { get; set; }
        [Required]
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public bool ValidPassword { get; set; }
        public bool ValidEmail { get; set; }
        public string? Claim { get; set; }

    }
}
