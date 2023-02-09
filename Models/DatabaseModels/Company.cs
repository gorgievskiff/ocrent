using System;
using System.Collections.Generic;

namespace Models.DatabaseModels;

public partial class Company
{
    public int CompanyId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string CompanyEmail { get; set; } = null!;

    public DateOnly CreatedOn { get; set; }

    public int CreatedBy { get; set; }

    public DateOnly? ModifiedOn { get; set; }

    public int? ModifiedBy { get; set; }

    public int? BusinessUserId { get; set; }

    public int? AdministratorId { get; set; }

    public virtual Administrator? Administrator { get; set; }

    public virtual BusinessUser? BusinessUser { get; set; }

    public virtual ICollection<DeliveryMan> DeliveryMen { get; } = new List<DeliveryMan>();

    public virtual ICollection<Location> Locations { get; } = new List<Location>();
}
