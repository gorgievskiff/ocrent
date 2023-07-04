using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataTransferObjects.Administrator
{
    public class AdministratorCompaniesDTO
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyEmail { get; set; }
        public bool IsApproved { get; set; }
        public int? BusinessUserId { get; set; }
        public string BusinessUserName { get; set; }
        public string BusinessUserEmail { get; set; }


    }
}
