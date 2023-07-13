namespace BackEnd.Models
{
    public class CarroVendidoModel
    {
        public int CarroVendidoId { get; set; }
        public int RuedaId { get; set; }
        public int ColorId { get; set; }
        public int CarroModeloId { get; set; }
        public int SeguroId { get; set; }
        public decimal PrecioTotal { get; set; }
    }
}