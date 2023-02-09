using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataTransferObjects
{
    public class RegisterDTO
    {
        [EmailAddress(ErrorMessage = "Not valid email!")]
        [Required(ErrorMessage ="Email address is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; } = null!;
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Pass { get; set; } = null!;
        [Required(ErrorMessage = "Password does not match")]
        public string ConfirmPass { get; set; } = null!;

        public bool IsBusinessUser { get; set; }

    }
}
