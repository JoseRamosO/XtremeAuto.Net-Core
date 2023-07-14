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
    public class TransaccionController : ControllerBase
    {

        private ITransaccionDAL transaccionDAL;

        private TransaccionModel Convertir(Transaccion transaccion)
        {
            return new TransaccionModel
            {
                TransaccionId = transaccion.TransaccionId,
                VentaId = transaccion.VentaId,
                TarjetaId = transaccion.TarjetaId,
                FechaTransaccion = transaccion.FechaTransaccion,
                FechaCorte = transaccion.FechaCorte,
                InteresesMorosidad = transaccion.InteresesMorosidad,
                Pagado = transaccion.Pagado,
                Precio = transaccion.Precio

            };
        }



        private Transaccion Convertir(TransaccionModel transaccion)
        {
            return new Transaccion
            {
                TransaccionId = transaccion.TransaccionId,
                VentaId = transaccion.VentaId,
                TarjetaId = transaccion.TarjetaId,
                FechaTransaccion = transaccion.FechaTransaccion,
                FechaCorte = transaccion.FechaCorte,
                InteresesMorosidad = transaccion.InteresesMorosidad,
                Pagado = transaccion.Pagado,
                Precio = transaccion.Precio
            };
        }


        #region Constructores

        public TransaccionController()
        {
            transaccionDAL = new TransaccionDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<TransaccionController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Transaccion> transacciones = await transaccionDAL.GetAll();
            List<TransaccionModel> models = new List<TransaccionModel>();

            foreach (var transaccion in transacciones)
            {

                models.Add(Convertir(transaccion));

            }

            return new JsonResult(models);
        }

        // GET api/<TransaccionController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Transaccion transaccion = await transaccionDAL.Get(id);


            return new JsonResult(Convertir(transaccion));
        }
        #endregion

        #region Agregar


        // POST api/<TransaccionController>
        [HttpPost]
        public JsonResult Post([FromBody] TransaccionModel transaccion)
        {

            transaccionDAL.Add(Convertir(transaccion));
            return new JsonResult(transaccion);
        }

        #endregion

        #region Modificar


        // PUT api/<TransaccionController>/5
        [HttpPut]
        public JsonResult Put([FromBody] TransaccionModel transaccion)
        {
            transaccionDAL.Update(Convertir(transaccion));
            return new JsonResult(transaccion);
        }
        #endregion


        #region Eliminar
        // DELETE api/<TransaccionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Transaccion transaccion = new Transaccion
            {
                TransaccionId = id
            };

            transaccionDAL.Remove(transaccion);

        }

        #endregion

    }
}
