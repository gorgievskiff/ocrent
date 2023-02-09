using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OCRent.Models;

namespace OCRent.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Results()
        {
            Models.CarModel[] cars =
            {
                new Models.CarModel(1, "Renault", new ModelModel("Clio", "petrol", "manual", "car", 2019, 5, 4), "white", "ASED-00000-GFAD-12E", "Mini", "Luxury", 19.00, "https://s3-prod-europe.autonews.com/s3fs-public/ANE_180319766_AR_-1_VBTXUOHIFCDO.jpg"),
                new Models.CarModel(2, "Ford", new ModelModel("Eco Sport", "diesel", "automatic", "jeep", 2021, 5, 4), "red", "ASED-12345-GFAD-12E", "Compact", "Economic", 25.50, "https://imgd.aeplcdn.com/0x0/cw/ec/40369/Ford-EcoSport-Right-Front-Three-Quarter-159249.jpg?wm=0"),
                new Models.CarModel(3, "Volkswagen", new ModelModel("Passat", "diesel", "manual", "car", 2019, 5, 4), "black", "RAFC-12345-GFAD-12E", "Compact", "Economic", 25.50, "https://imgd.aeplcdn.com/664x374/cw/ec/22548/Volkswagen-Passat-Headlamps-135233.jpg?wm=0&q=75"),
                new Models.CarModel(4, "Renault", new ModelModel("Koleos Intens", "diesel", "manual", "jeep", 2022, 5, 4), "white", "RAFC-12345-GFAD0000", "SUV", "Luxury", 35.70, "https://purepng.com/public/uploads/large/purepng.com-renault-koleos-white-carcarvehicletransportrenault-961524644205eq9ii.png"),
                new Models.CarModel(5, "Hyundai", new ModelModel("i10", "petrol", "automatic", "car", 2022, 5, 4), "#0000FF", "RAFC-12345-11111111", "Hatchback", "Economic", 19.00, "https://www.cars2buy.co.uk/images/car/600/92285.jpg"),
            };
            return View("Results", cars);
        }
    }
}
