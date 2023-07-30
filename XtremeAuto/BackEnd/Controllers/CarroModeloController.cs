using System.Drawing;
using BackEnd.Helpers;
using BackEnd.Models;
using DAL.Implementations;
using DAL.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarroModeloController : ControllerBase
    {

        private ICarroModeloDAL carroModeloDAL;
        private ImagenesUploader ImagenesUploader;

        private CarroModeloModel Convertir(CarroModelo carroModelo)
        {
            return new CarroModeloModel
            {
                CarroModeloId = carroModelo.CarroModeloId,
                Disponible = carroModelo.Disponible,
                Tipo = carroModelo.Tipo,
                Marca = carroModelo.Marca,
                Modelo = carroModelo.Modelo,
                Descripcion = carroModelo.Descripcion,
                Precio = carroModelo.Precio,
                Imagen = carroModelo.Imagen,
                Cantidad = carroModelo.Cantidad

            };
        }



        private CarroModelo Convertir(CarroModeloModel carroModelo)
        {
            return new CarroModelo
            {
                CarroModeloId = carroModelo.CarroModeloId,
                Disponible = carroModelo.Disponible,
                Tipo = carroModelo.Tipo,
                Marca = carroModelo.Marca,
                Modelo = carroModelo.Modelo,
                Descripcion = carroModelo.Descripcion,
                Precio = carroModelo.Precio,
                Imagen = carroModelo.Imagen,
                Cantidad = carroModelo.Cantidad
            };
        }


        #region Constructores

        public CarroModeloController()
        {
            ImagenesUploader = new ImagenesUploader();
            carroModeloDAL = new CarroModeloDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<CarroModeloController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<CarroModelo> carroModelos = await carroModeloDAL.GetAll();
            List<CarroModeloModel> models = new List<CarroModeloModel>();

            foreach (var carroModelo in carroModelos)
            {

                models.Add(Convertir(carroModelo));

            }

            return new JsonResult(models);
        }

        // GET api/<CarroModeloController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            CarroModelo carroModelo = await carroModeloDAL.Get(id);


            return new JsonResult(Convertir(carroModelo));
        }
        #endregion

        #region Agregar


        // POST api/<CarroModeloController>
        [HttpPost]
        public JsonResult Post([FromForm] CarroModeloModel carroModelo)
        {

            carroModelo.Imagen = ImagenesUploader.uploadImage(carroModelo.FormFile);
            carroModeloDAL.Add(Convertir(carroModelo));
            return new JsonResult(carroModelo);
        }


        #endregion

        #region Modificar


        // PUT api/<CarroModeloController>/5
        [HttpPut]
        public JsonResult Put([FromForm] CarroModeloModel carroModelo)
        {

            if (carroModelo.FormFile != null)
            {
                carroModelo.Imagen = ImagenesUploader.uploadImage(carroModelo.FormFile);

            }
            carroModeloDAL.Update(Convertir(carroModelo));
            return new JsonResult(carroModelo);
        }

        #endregion


        #region Eliminar
        // DELETE api/<CarroModeloController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            CarroModelo carroModelo = new CarroModelo
            {
                CarroModeloId = id
            };

            carroModeloDAL.Remove(carroModelo);

        }

        #endregion

    }

}
