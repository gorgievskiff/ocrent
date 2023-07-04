using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.DatabaseModels;
using Models.DataTransferObjects.Administrator;
using Models.DataTransferObjects.Company;
using ocrent;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Concrete
{
    public class CompanyDa : ICompanyDa
    {
        private readonly ApiContext _db;
        private static ILogger<CompanyDa> _logger;

        public CompanyDa(ApiContext db, ILogger<CompanyDa> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<bool> AddCompany(RegisterCompanyDTO companyDTO)
        {
            try
            {
               Company company = new Company();

                company.CompanyName = companyDTO.CompanyName;
                company.CompanyEmail = companyDTO.CompanyEmail;
                company.CreatedOn = DateOnly.FromDateTime(DateTime.Now);
                company.CreatedBy = companyDTO.CreatedBy;
                company.BusinessUserId = companyDTO.CreatedBy;

                _db.Companies.Add(company);
                await _db.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<List<UserCompaniesDTO>> GetUserCompanies(int userId)
        {
            try
            {
                List<UserCompaniesDTO> userCompanies = new List<UserCompaniesDTO>();
                var userCompaniesFromDb = await _db.Companies.Where(x => x.BusinessUserId == userId).ToListAsync();

                foreach(var company in userCompaniesFromDb)
                {

                    userCompanies.Add(new UserCompaniesDTO()
                    {
                        CompanyEmail = company.CompanyEmail,
                        CompanyName = company.CompanyName,
                        CompanyId = company.CompanyId,
                        IsApproved = company.AdministratorId != null ? true : false
                    });
                }
                return userCompanies;

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<AdministratorCompaniesDTO> GetCompany(int companyId)
        {
            try
            {
                var companyFromDb = await _db.Companies.Include(x => x.BusinessUser.User).Where(x => x.CompanyId == companyId).FirstOrDefaultAsync();
                AdministratorCompaniesDTO company = new AdministratorCompaniesDTO();
                company.CompanyEmail = companyFromDb.CompanyEmail;
                company.IsApproved = companyFromDb.AdministratorId != null ? true : false;
                company.BusinessUserName = companyFromDb.BusinessUser.User.Username;
                company.BusinessUserId = companyFromDb.BusinessUserId;
                company.BusinessUserEmail = companyFromDb.CompanyEmail;
                company.CompanyName = companyFromDb.CompanyName;
                company.CompanyId = companyFromDb.CompanyId;
                return company;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
