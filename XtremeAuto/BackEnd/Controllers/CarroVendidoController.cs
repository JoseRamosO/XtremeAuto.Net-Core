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
    public class CarroVendidoController : ControllerBase
    {

        private ICarroVendidoDAL carroVendidoDAL;

        private CarroVendidoModel Convertir(CarroVendido carroVendido)
        {
            return new CarroVendidoModel
            {
                CarroVendidoId = carroVendido.CarroVendidoId,
                RuedaId = carroVendido.RuedaId,
                ColorId = carroVendido.ColorId,
                CarroModeloId = carroVendido.CarroModeloId,
                SeguroId = carroVendido.SeguroId,
                PrecioTotal = carroVendido.PrecioTotal

            };
        }



        private CarroVendido Convertir(CarroVendidoModel carroVendido)
        {
            return new CarroVendido
            {
                CarroVendidoId = carroVendido.CarroVendidoId,
                RuedaId = carroVendido.RuedaId,
                ColorId = carroVendido.ColorId,
                CarroModeloId = carroVendido.CarroModeloId,
                SeguroId = carroVendido.SeguroId,
                PrecioTotal = carroVendido.PrecioTotal
            };
        }


        #region Constructores

        public CarroVendidoController()
        {
            carroVendidoDAL = new CarroVendidoDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<CarroVendidoController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<CarroVendido> carroVendidos = await carroVendidoDAL.GetAll();
            List<CarroVendidoModel> models = new List<CarroVendidoModel>();

            foreach (var carroVendido in carroVendidos)
            {

                models.Add(Convertir(carroVendido));

            }

            return new JsonResult(models);
        }

        // GET api/<CarroVendidoController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            CarroVendido carroVendido = await carroVendidoDAL.Get(id);


            return new JsonResult(Convertir(carroVendido));
        }
        #endregion

        #region Agregar


        // POST api/<CarroVendidoController>
        [HttpPost]
        public JsonResult Post([FromBody] CarroVendidoModel carroVendido)
        {

            carroVendidoDAL.Add(Convertir(carroVendido));
            return new JsonResult(carroVendido);
        }

        #endregion

        #region Modificar


        // PUT api/<CarroVendidoController>/5
        [HttpPut]
        public JsonResult Put([FromBody] CarroVendidoModel carroVendido)
        {
            carroVendidoDAL.Update(Convertir(carroVendido));
            return new JsonResult(carroVendido);
        }
        #endregion


        #region Eliminar
        // DELETE api/<CarroVendidoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            CarroVendido carroVendido = new CarroVendido
            {
                CarroVendidoId = id
            };

            carroVendidoDAL.Remove(carroVendido);

        }

        #endregion

    }
}
