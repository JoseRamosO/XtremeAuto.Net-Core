using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllVentas_Result

    {
        public int VentaId { get; set; }
        public int UsuarioId { get; set; }
        public int CarroVendidoId { get; set; }
        public decimal Total { get; set; }
        public int Meses { get; set; }
        public decimal Intereses { get; set; }
        public decimal SaldoPendiente { get; set; }
        public decimal SaldoAbonado { get; set; }
    }
}
