using Models.DataTransferObjects.Administrator;
using Models.DataTransferObjects.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Abstract
{
    public interface ICompanyDa
    {
        Task<bool> AddCompany(RegisterCompanyDTO companyDTO);
        Task<List<UserCompaniesDTO>> GetUserCompanies(int userId);
        Task<AdministratorCompaniesDTO> GetCompany(int companyId);
    }
}
