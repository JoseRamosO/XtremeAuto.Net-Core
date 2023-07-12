using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllTransacciones_Result
    {
        public int TransaccionId { get; set; }
        public int VentaId { get; set; }
        public int? TarjetaId { get; set; }
        public DateTime? FechaTransaccion { get; set; }
        public DateTime FechaCorte { get; set; }
        public decimal InteresesMorosidad { get; set; }
        public bool Pagado { get; set; }
        public decimal Precio { get; set; }
    }
}
