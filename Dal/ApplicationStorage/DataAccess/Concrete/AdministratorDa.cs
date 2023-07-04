using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.DataTransferObjects.Administrator;
using Models.DataTransferObjects.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Concrete
{
    public class AdministratorDa : IAdministrator
    {
        private readonly ApiContext _db;
        private static ILogger<AdministratorDa> _logger;

        public AdministratorDa(ApiContext db,ILogger<AdministratorDa> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<List<AdministratorCompaniesDTO>> GetAllCompanies()
        {
            try
            {
                var companies = new List<AdministratorCompaniesDTO>();
                var companiesFromDb = await _db.Companies.Include(x => x.BusinessUser.User).ToListAsync();
                foreach (var company in companiesFromDb)
                {

                    companies.Add(new AdministratorCompaniesDTO()
                    {
                        CompanyEmail = company.CompanyEmail,
                        CompanyName = company.CompanyName,
                        CompanyId = company.CompanyId,
                        IsApproved = company.AdministratorId != null ? true : false,
                        BusinessUserId = company.BusinessUserId,
                        BusinessUserName = company.BusinessUser.User.Username,
                        BusinessUserEmail = company.BusinessUser.User.Email,

                    });
                }
                return companies;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message); 
                throw;
            }    
        }

        public async Task<bool> ApproveCompany(int companyId, int administratorId)
        {
            try
            {
                var companyFromDb = await _db.Companies.Where(x => x.CompanyId == companyId).FirstOrDefaultAsync();
                if (companyFromDb != null)
                {
                    companyFromDb.AdministratorId = administratorId;
                    _db.Update(companyFromDb);
                    await _db.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

    }
}
