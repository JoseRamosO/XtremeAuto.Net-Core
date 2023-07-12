using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllUsuarios_Result
    {
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
    }
}
