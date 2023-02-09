using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCRent.Models
{
    public class ModelModel
    {
        public string model_name { get; set; }
        public string fuel { get; set; }
        public string transmission { get; set; }
        public string vehicle_type { get; set; }
        public int year { get; set; }
        public int num_seats { get; set; }
        public int num_doors { get; set; }

        public ModelModel(string model_name, string fuel, string transmission, string vehicle_type, int year, int num_seats, int num_doors)
        {
            this.model_name = model_name;
            this.fuel = fuel;
            this.transmission = transmission;
            this.vehicle_type = vehicle_type;
            this.year = year;
            this.num_seats = num_seats;
            this.num_doors = num_doors;
        }
    }
}
