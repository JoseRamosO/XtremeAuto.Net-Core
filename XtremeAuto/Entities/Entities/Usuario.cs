using System;
using System.Collections.Generic;

namespace Entities.Entities
{
    public partial class Usuario
    {
        public Usuario()
        {
            Tarjeta = new HashSet<Tarjetum>();
            Venta = new HashSet<Ventum>();
        }

        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public decimal Salario { get; set; }
        public string Cedula { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string SecurityStamp { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Username { get; set; } = null!;
        public int RolId { get; set; }
        public bool LockoutEnabled { get; set; }
        public int FailedAttemptsCount { get; set; }
        public DateTime LockoutEndDateUtc { get; set; }

        public virtual Rol Rol { get; set; } = null!;
        public virtual ICollection<Tarjetum> Tarjeta { get; set; }
        public virtual ICollection<Ventum> Venta { get; set; }
    }
}
