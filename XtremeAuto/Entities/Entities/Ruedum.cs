using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class Ruedum
    {
        public Ruedum()
        {
            CarroVendidos = new HashSet<CarroVendido>();
        }

        public int RuedaId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Imagen { get; set; } = null!;
        public decimal Precio { get; set; }

        public virtual ICollection<CarroVendido> CarroVendidos { get; set; }
    }
}
