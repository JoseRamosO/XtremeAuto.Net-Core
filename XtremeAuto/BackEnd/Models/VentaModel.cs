namespace BackEnd.Models
{
    public class VentaModel
    {
        public int VentaId { get; set; }
        public int UsuarioId { get; set; }
        public int CarroVendidoId { get; set; }
        public decimal Total { get; set; }
        public int Meses { get; set; }
        public decimal Intereses { get; set; }
        public decimal SaldoPendiente { get; set; }
        public decimal SaldoAbonado { get; set; }
    }
}