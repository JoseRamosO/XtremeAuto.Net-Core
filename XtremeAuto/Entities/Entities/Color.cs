using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class Color
    {
        public Color()
        {
            CarroVendidos = new HashSet<CarroVendido>();
        }

        public int ColorId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Imagen { get; set; } = null!;

        public virtual ICollection<CarroVendido> CarroVendidos { get; set; }
    }
}
