using Models.DataTransferObjects.Serach;
using Models.JSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Abstract
{
    public interface ISearchDa
    {
        Task<List<SearchLocationDTO>> GetLocations();
        Task<List<SearchBrandsDTO>> GetVehicleBrands();
        Task<List<CarsDTO>> GetVehiclesBySearchParameters(SearchJSON data);
        Task<List<CarsDTO>> GetAllVehicles();
        Task<List<CarsDTO>> GetVehilcesByLocation(SearchJSON data);
        Task<List<CarsDTO>> GetVehiclesByBrand(SearchJSON data);
    }
}
