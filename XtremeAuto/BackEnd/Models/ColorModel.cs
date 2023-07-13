namespace BackEnd.Models
{
    public class ColorModel
    {
        public int ColorId { get; set; }
        public string Nombre { get; set; } = null!;
        public byte[] Imagen { get; set; } = null!;
    }
}