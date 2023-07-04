using Models.DataTransferObjects.Administrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Abstract
{
    public interface IAdministrator
    {
        Task<List<AdministratorCompaniesDTO>> GetAllCompanies();
        Task<bool> ApproveCompany(int companyId, int administratorId);
    }
}
