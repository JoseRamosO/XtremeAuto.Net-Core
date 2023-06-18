using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class Tarjetum
    {
        public Tarjetum()
        {
            Transaccions = new HashSet<Transaccion>();
        }

        public int TarjetaId { get; set; }
        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = null!;
        public string NumeroDeTarjeta { get; set; } = null!;
        public string Cvv { get; set; } = null!;
        public DateTime FechaVencimiento { get; set; }
        public bool LockoutEnabled { get; set; }

        public virtual Usuario Usuario { get; set; } = null!;
        public virtual ICollection<Transaccion> Transaccions { get; set; }
    }
}
