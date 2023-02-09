using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCRent.Models
{
    public class ContractModel
    {
        public ClientModel client { get; set; }
        public CarModel car { get; set; }
        public string additonal_eq { get; set; }
        public string duration { get; set; }

        public ContractModel(CarModel car, string additional_eq, string duration)
        {
            this.client = new ClientModel("darmitt", "Dario", "Mitev", "Vinica street num 1", "dario_mitev@yahoo.com");
            this.car = car;
            this.additonal_eq = additonal_eq;
            this.duration = duration;
        }
    }
}
