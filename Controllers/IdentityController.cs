using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ocrent.Models;
using System.Security.Claims;
using System.Diagnostics;

namespace ocrent.Controllers
{
    public class IdentityController : Controller
    {
        private ApiContext _context;

        public IdentityController(ApiContext context)
        {
            _context = context;
        }
    
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            user.CreatedOn = DateOnly.FromDateTime(DateTime.Now);
            _context.Users.Add(user);
            _context.SaveChanges();
            return RedirectToAction("Index", "Home");
        }



        public async Task<IActionResult> Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(User model)
        {
            if (ModelState.IsValid)
            {
                var userdetails = 1;
                if (userdetails == null)
                {
                    ModelState.AddModelError("Password", "Invalid login attempt.");
                    return View("Index");
                }
                HttpContext.Session.SetString("userId", "Filip");

            }
            else
            {
                return View("Index");
            }
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }

        public void ValidationMessage(string key, string alert, string value)
        {
            try
            {
                TempData.Remove(key);
                TempData.Add(key, value);
                TempData.Add("alertType", alert);
            }
            catch
            {
                Debug.WriteLine("TempDataMessage Error");
            }

        }

        //private bool ValidateLogin(string username, string password)
        //{
        //    // Check the user/pass here!
        //    // For example's sake, the credentials are always valid.
        //    return true;
        //}

        //private async Task SignInUser(string username)
        //{
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, username),
        //        new Claim("MyCustomClaim", "my claim value")
        //    };

        //    var claimsIdentity = new ClaimsIdentity(
        //        claims, CookieAuthenticationDefaults.AuthenticationScheme);

        //    await HttpContext.SignInAsync(
        //        CookieAuthenticationDefaults.AuthenticationScheme,
        //        new ClaimsPrincipal(claimsIdentity));
        //}
    }
}
