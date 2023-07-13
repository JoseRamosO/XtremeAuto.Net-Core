﻿namespace BackEnd.Models
{
    public class RuedaModel
    {
        public int RuedaId { get; set; }
        public string Nombre { get; set; } = null!;
        public byte[] Imagen { get; set; } = null!;
        public decimal Precio { get; set; }

    }
}