using System;
using System.Collections.Generic;

namespace ocrent.Models;

public partial class Administrator
{
    public int UserId { get; set; }

    public virtual ICollection<Company> Companies { get; } = new List<Company>();

    public virtual User User { get; set; } = null!;
}
