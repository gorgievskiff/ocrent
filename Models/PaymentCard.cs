using System;
using System.Collections.Generic;

namespace ocrent.Models;

public partial class PaymentCard
{
    public int CardId { get; set; }

    public string CardNumber { get; set; } = null!;

    public decimal Cvc { get; set; }

    public DateOnly ValidThru { get; set; }

    public string HolderName { get; set; } = null!;

    public int? UserId { get; set; }

    public virtual ICollection<Payment> Payments { get; } = new List<Payment>();

    public virtual Client? User { get; set; }
}
