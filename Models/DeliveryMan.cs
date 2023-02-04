using System;
using System.Collections.Generic;

namespace ocrent.Models;

public partial class DeliveryMan
{
    public int UserId { get; set; }

    public int? BusinessUserId { get; set; }

    public int? CompanyId { get; set; }

    public decimal? Salary { get; set; }

    public DateOnly DateOfEmployment { get; set; }

    public virtual User? BusinessUser { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<Contract> Contracts { get; } = new List<Contract>();

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
}
