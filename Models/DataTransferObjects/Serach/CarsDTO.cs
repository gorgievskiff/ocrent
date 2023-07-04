using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataTransferObjects.Serach
{
    public class CarsDTO
    {
        public int CarId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int ModelYear { get; set; }
        public int NumSeats { get; set; }
        public int NumOfDoors { get; set; }
        public string Fuel { get; set; }
        public string Transmission { get; set; }
        public string FuelEfficiency { get; set; }
        public double DailyRentalPrice { get; set; }
        public string City { get; set; }
        public bool IsAvailable { get; set; }
        public string ImgUrl { get; set; }
        public string CompanyName { get; set; }

    }
}
