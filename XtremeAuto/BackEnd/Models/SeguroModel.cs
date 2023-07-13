namespace BackEnd.Models
{
    public class SeguroModel
    {
        public int SeguroId { get; set; }
        public string Nombre { get; set; } = null!;
        public int Plazo { get; set; }
        public decimal Precio { get; set; }
    }
}