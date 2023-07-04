using System;
using System.Collections.Generic;

namespace ocrent;

public partial class Registration
{
    public int RegistrationId { get; set; }

    public string PlateNum { get; set; } = null!;

    public DateOnly RegistredOn { get; set; }

    public DateOnly ValidThru { get; set; }

    public bool IsAvailable { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
}
