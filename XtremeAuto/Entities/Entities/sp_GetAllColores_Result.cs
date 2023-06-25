using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class sp_GetAllColores_Result
    {
        public int ColorId { get; set; }
        public string Nombre { get; set; } = null!;
        public byte[] Imagen { get; set; } = null!;
    }
}
