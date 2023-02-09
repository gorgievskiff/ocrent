using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Diagnostics;
using Dal.ApplicationStorage;
using Models.DatabaseModels;
using Dal.ApplicationStorage.DataAccess.Abstract;
using Models.DataTransferObjects;
using System.Text.RegularExpressions;

namespace ocrent.Controllers
{
    public class IdentityController : Controller
    {
        private readonly IIdentityCustomDa _identityDa;
        private List<Claim> claims;

        public IdentityController(IIdentityCustomDa identityDa)
        {
            _identityDa = identityDa;
            claims = new List<Claim>();
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterDTO registerInfo)
        {
            if (ModelState.IsValid)
            {
                if (registerInfo.Pass.Equals(registerInfo.ConfirmPass))
                {
                    await _identityDa.Register(registerInfo);
                    return RedirectToAction("Login", "Identity");
                }
                else
                {
                    ModelState.AddModelError("ConfirmPass", "Password does not match!");
                    return View("Register");
                }

            }
            return View("Register");
        }

        public async Task<IActionResult> Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginDTO model)
        {
            if (ModelState.IsValid)
            {
                var userdetails = await _identityDa.CheckLoginInformation(model);
                if (!userdetails.ValidPassword || !userdetails.ValidEmail)
                {
                    if (!userdetails.ValidEmail)
                        ModelState.AddModelError("Email", "Wrong email or password.");
                    else
                        ModelState.AddModelError("Password", "Wrong password.");
                    
                    return View("Login");
                }
                HttpContext.Session.SetString("userId", userdetails.UserId.ToString());
                HttpContext.Session.SetString("email", userdetails.Email);

                //TODO-> Add claims based on user, Adminstrator, Client and BusinessUser
                //Make logic for getting if user is administrator, client or business user in DataAccess Layer
                //Change claims values from hardcoded strings to StaticDetail enum

               await AddClaimAsync(model.Email, "BusinessUser");

            }
            else
            {
                return View("Login");
            }
            return RedirectToAction("Index", "Home");
        }

        public IActionResult TestClaimReading()
        {
            var email = HttpContext.Session.GetString("email");
            var customClaim = HttpContext.User.FindFirst(email);

            return Content($"User ovoj has custom claim value: {customClaim.Value}");
        }

        private async Task AddClaimAsync(string email, string claimType)
        {
            Claim claim = new Claim(email, claimType);
            claims.Add(claim);

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));
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
