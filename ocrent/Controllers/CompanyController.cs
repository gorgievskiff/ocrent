using Microsoft.AspNetCore.Mvc;

namespace ocrent.Controllers
{
    public class CompanyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult RegisterCompany()
        {
            return View();
        }
    }
}
