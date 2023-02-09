using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DatabaseModels;

public partial class Client
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    public virtual ICollection<Contract> Contracts { get; } = new List<Contract>();

    public virtual ICollection<PaymentCard> PaymentCards { get; } = new List<PaymentCard>();

    public virtual User User { get; set; } = null!;
}
