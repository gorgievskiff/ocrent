using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.AspNetCore.Mvc;
using Models.DataTransferObjects.Serach;
using Models.JSON;
using Models.ViewModels;

namespace ocrent.Controllers
{
    public class SearchController : Controller
    {
        private readonly ISearchDa _searchDa;
        public SearchController(ISearchDa searchDa)
        {
            _searchDa = searchDa;
        }

        public async Task<IActionResult> Index()
        {
            var locations = await _searchDa.GetLocations();
            var brands = await _searchDa.GetVehicleBrands();

            var viewModel = new SearchViewModel();
            viewModel.Brands = brands;
            viewModel.Locations = locations;

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> SearchData(SearchJSON data)
        {
            var model = await _searchDa.GetVehiclesBySearchParameters(data);

            return Json(Url.Action("Result", "Search", new {city = data.City, brand = data.Brand, startDate = data.StartDate, endDate = data.EndDate}));
        }

        public async Task<IActionResult> Result(string city, string brand, string startDate, string endDate)
        {
            var data = new SearchJSON()
            {
                City = city,
                Brand = brand,
                StartDate = startDate,
                EndDate = endDate
            };

            List<CarsDTO> model = new List<CarsDTO>();
            if(city!= null && brand != null)
            {
                model = await _searchDa.GetVehiclesBySearchParameters(data);
            }
            else
            {
                model = await _searchDa.GetAllVehicles();

            }

            return View(model);
            
        }
    }
}
