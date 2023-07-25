namespace BackEnd.Models
{
    public class ColorModel
    {
        public int ColorId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Imagen { get; set; } = null!;
        public IFormFile? FormFile { get; set; }
    }
}