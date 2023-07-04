using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.AspNetCore.Mvc;
using Models.DataTransferObjects.Administrator;

namespace ocrent.Controllers
{
    public class AdministratorController : Controller
    {
        private readonly IAdministrator _administratorDa;
        private readonly ICompanyDa _companyDa;


        public AdministratorController(IAdministrator administratorDa,ICompanyDa companyDa)
        {
            _administratorDa = administratorDa;
            _companyDa = companyDa;
        }
        public async Task<IActionResult> Companies()
        {
            var companies = await _administratorDa.GetAllCompanies();
            return View(companies);
        }

        public async Task<IActionResult> ApproveCompany(int companyId)
        {
            var company = await _companyDa.GetCompany(companyId);
            //var administratorId = HttpContext.Session.GetString("userId");
            //await _administratorDa.ApproveCompany(companyId, Int32.Parse(administratorId));

            return View(company);
        }

        [HttpPost]
        public async Task<IActionResult> ApproveCompany(AdministratorCompaniesDTO dto)
        {
            var administratorId = HttpContext.Session.GetString("userId");
            await _administratorDa.ApproveCompany(dto.CompanyId, Int32.Parse(administratorId));

            return RedirectToAction("Companies", "Administrator");
        }
    }
}
