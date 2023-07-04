using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Models.DataTransferObjects.Company;

namespace ocrent.Controllers
{
    public class CompanyController : Controller
    {
        private readonly ICompanyDa _companyDa;
        public CompanyController(ICompanyDa companyDa)
        {
            _companyDa = companyDa;
        }

        public async Task<IActionResult> IndexAsync()
        {
            var userId = HttpContext.Session.GetString("userId");
            var companies = await _companyDa.GetUserCompanies(Int32.Parse(userId));

            return View(companies);
        }

        public IActionResult RegisterCompany()
        {
            var email = HttpContext.Session.GetString("email");
            ViewBag.UserEmail = email;
            return View();
        }

        [HttpPost]
        public IActionResult RegisterCompany(RegisterCompanyDTO companyDTO)
        {
            if (companyDTO.CompanyEmail != null && companyDTO.CompanyName != null)
            {
                companyDTO.CreatedBy = Int32.Parse(HttpContext.Session.GetString("userId"));
                _companyDa.AddCompany(companyDTO);
                return Json(Url.Action("Index", "Company"));
            }
            return View();
        }


    }
}
