using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ocrent.Models;
using System.Diagnostics;

namespace ocrent.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApiContext _context;

        public HomeController(ILogger<HomeController> logger, ApiContext context)
        {
            _logger = logger;
            _context = context; 
        }

        public async Task<IActionResult> Index()
        {
            var query = await (from users in _context.Users
                         join administrators in _context.Administrators
                         on users.UserId equals administrators.UserId
                         select new
                         {
                             users,
                             administrators,
                         }).ToListAsync();
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}