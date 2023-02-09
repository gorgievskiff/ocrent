using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Win32;
using Models.DatabaseModels;
using Models.DataTransferObjects.Serach;
using Models.JSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Concrete
{
    public class SearchDa : ISearchDa
    {
        private readonly ApiContext _db;
        private static ILogger<ApiContext> _logger;

		public SearchDa(ApiContext db, ILogger<ApiContext> logger)
		{
            _db = db;
            _logger = logger;
        }
        public async Task<List<SearchLocationDTO>> GetLocations()
        {
			try
			{
                var citiesFromDb = await _db.Locations.ToListAsync();
                List<SearchLocationDTO> cities = new List<SearchLocationDTO>();
                foreach(var city in citiesFromDb)
                {
                    cities.Add(new SearchLocationDTO()
                    {
                        CityName = city.City,
                    });
                }

                return cities.DistinctBy(x => x.CityName).ToList();
			}
			catch (Exception e)
			{
                _logger.LogError(e.Message);
				throw;
			}
        }

        public async Task<List<SearchBrandsDTO>> GetVehicleBrands()
        {
            try
            {
                var brandsFromDb = await _db.Vehicles.ToListAsync();
                List<SearchBrandsDTO> brands = new List<SearchBrandsDTO>();
                foreach(var brand in brandsFromDb)
                {
                    brands.Add(new SearchBrandsDTO()
                    {
                        BrandName = brand.Brand
                    });
                }

                return brands.DistinctBy(x => x.BrandName).ToList();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<List<CarsDTO>> GetVehiclesBySearchParameters(SearchJSON data)
        {
            try
            {
                var query = await (from vehicles in _db.Vehicles
                             join locations in _db.Locations on vehicles.LocationId equals locations.LocationId
                             join models in _db.Models on vehicles.ModelId equals models.ModelId
                             join registrations in _db.Registrations on vehicles.RegistrationId equals registrations.RegistrationId
                             select new CarsDTO()
                             {
                                 CarId = vehicles.VehicleId,
                                 Brand = vehicles.Brand,
                                 Model = models.ModelName,
                                 Color = models.Color,
                                 ModelYear = models.ModelYear.Year,
                                 NumSeats = models.NumOfSeats,
                                 NumOfDoors = models.NumOfDoors,
                                 Fuel = models.Fuel,
                                 Transmission = models.Transmission,
                                 FuelEfficiency = vehicles.FuelEfficiency,
                                 DailyRentalPrice = (double)vehicles.DailyRentalPrice,
                                 City = locations.City,
                                 IsAvailable = registrations.IsAvailable
                             }
                             ).Where(x => x.Brand == data.Brand && x.City == data.City && x.IsAvailable)
                             .ToListAsync();

                return query;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<List<CarsDTO>> GetAllVehicles()
        {
            try
            {
                var query = await (from vehicles in _db.Vehicles
                                   join locations in _db.Locations on vehicles.LocationId equals locations.LocationId
                                   join models in _db.Models on vehicles.ModelId equals models.ModelId
                                   join registrations in _db.Registrations on vehicles.RegistrationId equals registrations.RegistrationId
                                   select new CarsDTO()
                                   {
                                       CarId = vehicles.VehicleId,
                                       Brand = vehicles.Brand,
                                       Model = models.ModelName,
                                       Color = models.Color,
                                       ModelYear = models.ModelYear.Year,
                                       NumSeats = models.NumOfSeats,
                                       NumOfDoors = models.NumOfDoors,
                                       Fuel = models.Fuel,
                                       Transmission = models.Transmission,
                                       FuelEfficiency = vehicles.FuelEfficiency,
                                       DailyRentalPrice = (double)vehicles.DailyRentalPrice,
                                       City = locations.City,
                                       IsAvailable = registrations.IsAvailable
                                   }
                             ).ToListAsync();

                return query;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
