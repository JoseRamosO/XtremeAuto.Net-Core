using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllSeguros_Result
    {
        public int SeguroId { get; set; }
        public string Nombre { get; set; } = null!;
        public int Plazo { get; set; }
        public decimal Precio { get; set; }
    }
}
