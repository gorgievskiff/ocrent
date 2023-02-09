using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCRent.Models
{
    public class CarModel
    {
        public int id { get; set; }
        public string brand { get; set; }
        public ModelModel model { get; set; }
        public string color { get; set; }
        public string chassis_num { get; set; }
        public string vehicle_type { get; set; }
        public string fuel_efficiency { get; set; }
        public double daily_rental_price { get; set; }
        public string image { get; set; }

        public CarModel(int id, string brand, ModelModel model, string color, string chassis_num, string vehicle_type, string fuel_efficiency, double daily_rental_price, string image)
        {
            this.id = id;
            this.brand = brand;
            this.model = model;
            this.color = color;
            this.chassis_num = chassis_num;
            this.vehicle_type = vehicle_type;
            this.fuel_efficiency = fuel_efficiency;
            this.daily_rental_price = daily_rental_price;
            this.image = image;
        }
    }
}
