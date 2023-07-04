using System;
using System.Collections.Generic;

namespace ocrent;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Pass { get; set; } = null!;

    public DateOnly CreatedOn { get; set; }

    public DateOnly? ModifiedOn { get; set; }

    public virtual Administrator? Administrator { get; set; }

    public virtual BusinessUser? BusinessUser { get; set; }

    public virtual Client? Client { get; set; }

    public virtual ICollection<DeliveryMan> DeliveryManBusinessUsers { get; } = new List<DeliveryMan>();

    public virtual DeliveryMan? DeliveryManUser { get; set; }
}
