namespace BackEnd.Models
{
    public class TarjetaModel
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