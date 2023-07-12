using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllCarroVendidos_Result
    {
        public int CarroVendidoId { get; set; }
        public int RuedaId { get; set; }
        public int ColorId { get; set; }
        public int CarroModeloId { get; set; }
        public int SeguroId { get; set; }
        public decimal PrecioTotal { get; set; }
    }
}
