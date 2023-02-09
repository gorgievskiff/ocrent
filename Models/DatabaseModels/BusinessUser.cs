using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DatabaseModels;

public partial class BusinessUser
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    public virtual ICollection<Company> Companies { get; } = new List<Company>();

    public virtual User User { get; set; } = null!;
}
