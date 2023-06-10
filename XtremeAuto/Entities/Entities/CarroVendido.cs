using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class CarroVendido
    {
        public CarroVendido()
        {
            Venta = new HashSet<Ventum>();
        }

        public int CarroVendidoId { get; set; }
        public int RuedaId { get; set; }
        public int ColorId { get; set; }
        public int CarroModeloId { get; set; }
        public int SeguroId { get; set; }
        public decimal PrecioTotal { get; set; }

        public virtual CarroModelo CarroModelo { get; set; } = null!;
        public virtual Color Color { get; set; } = null!;
        public virtual Ruedum Rueda { get; set; } = null!;
        public virtual Seguro Seguro { get; set; } = null!;
        public virtual ICollection<Ventum> Venta { get; set; }
    }
}
