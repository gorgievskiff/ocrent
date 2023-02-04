using System;
using System.Collections.Generic;

namespace ocrent.Models;

public partial class Client
{
    public int UserId { get; set; }

    public virtual ICollection<Contract> Contracts { get; } = new List<Contract>();

    public virtual ICollection<PaymentCard> PaymentCards { get; } = new List<PaymentCard>();

    public virtual User User { get; set; } = null!;
}
