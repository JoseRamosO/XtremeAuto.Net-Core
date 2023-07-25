using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    [Keyless]
    public class sp_GetAllColores_Result
    {
        public int ColorId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Imagen { get; set; } = null!;
    }
}
