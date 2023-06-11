using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class Seguro
    {
        public Seguro()
        {
            CarroVendidos = new HashSet<CarroVendido>();
        }

        public int SeguroId { get; set; }
        public string Nombre { get; set; } = null!;
        public int Plazo { get; set; }
        public decimal Precio { get; set; }

        public virtual ICollection<CarroVendido> CarroVendidos { get; set; }
    }
}
