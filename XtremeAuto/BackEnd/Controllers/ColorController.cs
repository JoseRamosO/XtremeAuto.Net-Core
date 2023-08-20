using BackEnd.Helpers;
using BackEnd.Models;
using DAL.Implementations;
using DAL.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {

        private IColorDAL colorDAL;
        private ImagenesUploader ImagenesUploader;

        private ColorModel Convertir(Color color)
        {
            return new ColorModel
            {
                ColorId = color.ColorId,
                Nombre = color.Nombre,
                Imagen = color.Imagen

            };
        }



        private Color Convertir(ColorModel color)
        {
            return new Color
            {
                ColorId = color.ColorId,
                Nombre = color.Nombre,
                Imagen = color.Imagen
            };
        }


        #region Constructores

        public ColorController()
        {
            colorDAL = new ColorDALImpl();
            ImagenesUploader = new ImagenesUploader();
        }

        #endregion


        #region Consultas

        // GET: api/<ColorController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Color> colors = await colorDAL.GetAll();
            List<ColorModel> models = new List<ColorModel>();

            foreach (var color in colors)
            {

                models.Add(Convertir(color));

            }

            return new JsonResult(models);
        }

        // GET api/<ColorController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Color color = await colorDAL.Get(id);


            return new JsonResult(Convertir(color));
        }
        #endregion

        #region Agregar


        // POST api/<ColorController>
        [HttpPost]
        public JsonResult Post([FromForm] ColorModel color)
        {

            color.Imagen = ImagenesUploader.uploadImage(color.FormFile);
            colorDAL.Add(Convertir(color));
            return new JsonResult(color);
        }

        #endregion

        #region Modificar


        // PUT api/<ColorController>/5
        [HttpPut]
        public JsonResult Put([FromForm] ColorModel color)
        {
            if (color.FormFile != null)
            {
                color.Imagen = ImagenesUploader.uploadImage(color.FormFile);

            }
            colorDAL.Update(Convertir(color));
            return new JsonResult(color);
        }
        #endregion


        #region Eliminar
        // DELETE api/<ColorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Color color = new Color
            {
                ColorId = id
            };

            colorDAL.Remove(color);

        }

        #endregion

    }
}
