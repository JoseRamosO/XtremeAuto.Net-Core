namespace BackEnd.Models
{
    public class TransaccionModel
    {
        public int TransaccionId { get; set; }
        public int VentaId { get; set; }
        public int? TarjetaId { get; set; }
        public DateTime? FechaTransaccion { get; set; }
        public DateTime FechaCorte { get; set; }
        public decimal InteresesMorosidad { get; set; }
        public bool Pagado { get; set; }
        public decimal Precio { get; set; }
    }
}