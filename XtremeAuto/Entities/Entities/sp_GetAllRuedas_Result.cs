using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class sp_GetAllRuedas_Result
    {
        public int RuedaId { get; set; }
        public string Nombre { get; set; } = null!;
        public byte[] Imagen { get; set; } = null!;
        public decimal Precio { get; set; }
    }
}
