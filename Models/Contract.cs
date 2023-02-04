using System;
using System.Collections.Generic;

namespace ocrent.Models;

public partial class Contract
{
    public DateOnly SignedDate { get; set; }

    public int UserId { get; set; }

    public int VehicleId { get; set; }

    public int DeliveryManId { get; set; }

    public int? PaymentId { get; set; }

    public int? CardId { get; set; }

    public string Address { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string? Review { get; set; }

    public bool? Hasnavigation { get; set; }

    public bool? Hasgreencard { get; set; }

    public bool? Hasbabyseat { get; set; }

    public bool? Hasroofrack { get; set; }

    public virtual DeliveryMan DeliveryMan { get; set; } = null!;

    public virtual Payment? Payment { get; set; }

    public virtual Client User { get; set; } = null!;

    public virtual Vehicle Vehicle { get; set; } = null!;
}
