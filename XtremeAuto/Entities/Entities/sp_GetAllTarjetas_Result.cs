using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllTarjetas_Result
    {
        public int TarjetaId { get; set; }
        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = null!;
        public string NumeroDeTarjeta { get; set; } = null!;
        public string Cvv { get; set; } = null!;
        public DateTime FechaVencimiento { get; set; }
        public bool LockoutEnabled { get; set; }
    }
}
