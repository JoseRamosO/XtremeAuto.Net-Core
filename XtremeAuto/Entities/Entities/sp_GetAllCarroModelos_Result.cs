﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class sp_GetAllCarroModelos_Result
    {
        public int CarroModeloId { get; set; }
        public bool Disponible { get; set; }
        public string Tipo { get; set; } = null!;
        public string Marca { get; set; } = null!;
        public string Modelo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public decimal Precio { get; set; }
        public byte[] Imagen { get; set; } = null!;
        public int Cantidad { get; set; }
    }
}
