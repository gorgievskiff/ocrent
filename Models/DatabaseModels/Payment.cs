using System;
using System.Collections.Generic;

namespace ocrent;

public partial class Payment
{
    public int PaymentId { get; set; }

    public DateOnly PaymentDate { get; set; }

    public TimeOnly PaymentTime { get; set; }

    public decimal Amount { get; set; }

    public int CardId { get; set; }

    public virtual PaymentCard Card { get; set; } = null!;

    public virtual ICollection<Contract> Contracts { get; } = new List<Contract>();
}
