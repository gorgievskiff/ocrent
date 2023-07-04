using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataTransferObjects.Company
{
    public class UserCompaniesDTO
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyEmail { get; set; }
        public bool IsApproved { get; set; }

    }
}
