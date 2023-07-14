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
    public class VentaController : ControllerBase
    {

        private IVentaDAL ventaDAL;

        private VentaModel Convertir(Ventum venta)
        {
            return new VentaModel
            {
                VentaId = venta.VentaId,
                UsuarioId = venta.UsuarioId,
                CarroVendidoId = venta.CarroVendidoId,
                Total = venta.Total,
                Meses = venta.Meses,
                Intereses = venta.Intereses,
                SaldoPendiente = venta.SaldoPendiente,
                SaldoAbonado = venta.SaldoAbonado

            };
        }



        private Ventum Convertir(VentaModel venta)
        {
            return new Ventum
            {
                VentaId = venta.VentaId,
                UsuarioId = venta.UsuarioId,
                CarroVendidoId = venta.CarroVendidoId,
                Total = venta.Total,
                Meses = venta.Meses,
                Intereses = venta.Intereses,
                SaldoPendiente = venta.SaldoPendiente,
                SaldoAbonado = venta.SaldoAbonado
            };
        }


        #region Constructores

        public VentaController()
        {
            ventaDAL = new VentaDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<VentaController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Ventum> ventas = await ventaDAL.GetAll();
            List<VentaModel> models = new List<VentaModel>();

            foreach (var venta in ventas)
            {

                models.Add(Convertir(venta));

            }

            return new JsonResult(models);
        }

        // GET api/<VentaController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Ventum venta = await ventaDAL.Get(id);


            return new JsonResult(Convertir(venta));
        }
        #endregion

        #region Agregar


        // POST api/<VentaController>
        [HttpPost]
        public JsonResult Post([FromBody] VentaModel venta)
        {

            ventaDAL.Add(Convertir(venta));
            return new JsonResult(venta);
        }

        #endregion

        #region Modificar


        // PUT api/<VentaController>/5
        [HttpPut]
        public JsonResult Put([FromBody] VentaModel venta)
        {
            ventaDAL.Update(Convertir(venta));
            return new JsonResult(venta);
        }
        #endregion


        #region Eliminar
        // DELETE api/<VentaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Ventum venta = new Ventum
            {
                VentaId = id
            };

            ventaDAL.Remove(venta);

        }

        #endregion

    }
}
