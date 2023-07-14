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
    public class TarjetaController : ControllerBase
    {

        private ITarjetaDAL tarjetaDAL;

        private TarjetaModel Convertir(Tarjetum tarjeta)
        {
            return new TarjetaModel
            {
                TarjetaId = tarjeta.TarjetaId,
                UsuarioId = tarjeta.UsuarioId,
                Nombre = tarjeta.Nombre,
                NumeroDeTarjeta = tarjeta.NumeroDeTarjeta,
                Cvv = tarjeta.Cvv,
                FechaVencimiento = tarjeta.FechaVencimiento

            };
        }



        private Tarjetum Convertir(TarjetaModel tarjeta)
        {
            return new Tarjetum
            {
                TarjetaId = tarjeta.TarjetaId,
                UsuarioId = tarjeta.UsuarioId,
                Nombre = tarjeta.Nombre,
                NumeroDeTarjeta = tarjeta.NumeroDeTarjeta,
                Cvv = tarjeta.Cvv,
                FechaVencimiento = tarjeta.FechaVencimiento
            };
        }


        #region Constructores

        public TarjetaController()
        {
            tarjetaDAL = new TarjetaDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Tarjetum> tarjetas = await tarjetaDAL.GetAll();
            List<TarjetaModel> models = new List<TarjetaModel>();

            foreach (var tarjeta in tarjetas)
            {

                models.Add(Convertir(tarjeta));

            }

            return new JsonResult(models);
        }

        // GET api/<TarjetaController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Tarjetum tarjeta = await tarjetaDAL.Get(id);


            return new JsonResult(Convertir(tarjeta));
        }
        #endregion

        #region Agregar


        // POST api/<TarjetaController>
        [HttpPost]
        public JsonResult Post([FromBody] TarjetaModel tarjeta)
        {

            tarjetaDAL.Add(Convertir(tarjeta));
            return new JsonResult(tarjeta);
        }

        #endregion

        #region Modificar


        // PUT api/<TarjetaController>/5
        [HttpPut]
        public JsonResult Put([FromBody] TarjetaModel tarjeta)
        {
            tarjetaDAL.Update(Convertir(tarjeta));
            return new JsonResult(tarjeta);
        }
        #endregion


        #region Eliminar
        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Tarjetum tarjeta = new Tarjetum
            {
                TarjetaId = id
            };

            tarjetaDAL.Remove(tarjeta);

        }

        #endregion

    }
}
