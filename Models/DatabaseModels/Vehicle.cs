using System;
using System.Collections.Generic;

namespace ocrent;

public partial class Vehicle
{
    public int VehicleId { get; set; }

    public string ChassisNumber { get; set; } = null!;

    public string VehicleType { get; set; } = null!;

    public string FuelEfficiency { get; set; } = null!;

    public string Brand { get; set; } = null!;

    public decimal DailyRentalPrice { get; set; }

    public int? CompanyId { get; set; }

    public int? ModelId { get; set; }

    public int? LocationId { get; set; }

    public int? RegistrationId { get; set; }

    public virtual ICollection<Contract> Contracts { get; } = new List<Contract>();

    public virtual Location? Location { get; set; }

    public virtual Model? Model { get; set; }

    public virtual Registration? Registration { get; set; }

    public virtual ICollection<DeliveryMan> Users { get; } = new List<DeliveryMan>();
}
