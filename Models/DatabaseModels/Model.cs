using System;
using System.Collections.Generic;

namespace Models.DatabaseModels;

public partial class Model
{
    public int ModelId { get; set; }

    public string ModelName { get; set; } = null!;

    public string Color { get; set; } = null!;

    public DateOnly ModelYear { get; set; }

    public int NumOfSeats { get; set; }

    public int NumOfDoors { get; set; }

    public string Fuel { get; set; } = null!;

    public string Transmission { get; set; } = null!;

    public string VehicleType { get; set; } = null!;

    public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
}
