using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCRent.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult RegisterBusinessUser()
        {
            return View();
        }
        public IActionResult RegisterCompany()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }

    }
}
