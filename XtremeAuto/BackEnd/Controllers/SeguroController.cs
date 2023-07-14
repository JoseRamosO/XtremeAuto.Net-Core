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
    public class SeguroController : ControllerBase
    {

        private ISeguroDAL seguroDAL;

        private SeguroModel Convertir(Seguro seguro)
        {
            return new SeguroModel
            {
                SeguroId = seguro.SeguroId,
                Nombre = seguro.Nombre,
                Precio = seguro.Precio,
                Plazo = seguro.Plazo

            };
        }



        private Seguro Convertir(SeguroModel seguro)
        {
            return new Seguro
            {
                SeguroId = seguro.SeguroId,
                Nombre = seguro.Nombre,
                Precio = seguro.Precio,
                Plazo = seguro.Plazo
            };
        }


        #region Constructores

        public SeguroController()
        {
            seguroDAL = new SeguroDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<SeguroController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Seguro> seguros = await seguroDAL.GetAll();
            List<SeguroModel> models = new List<SeguroModel>();

            foreach (var seguro in seguros)
            {

                models.Add(Convertir(seguro));

            }

            return new JsonResult(models);
        }

        // GET api/<SeguroController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Seguro seguro = await seguroDAL.Get(id);


            return new JsonResult(Convertir(seguro));
        }
        #endregion

        #region Agregar


        // POST api/<SeguroController>
        [HttpPost]
        public JsonResult Post([FromBody] SeguroModel seguro)
        {

            seguroDAL.Add(Convertir(seguro));
            return new JsonResult(seguro);
        }

        #endregion

        #region Modificar


        // PUT api/<SeguroController>/5
        [HttpPut]
        public JsonResult Put([FromBody] SeguroModel seguro)
        {
            seguroDAL.Update(Convertir(seguro));
            return new JsonResult(seguro);
        }
        #endregion


        #region Eliminar
        // DELETE api/<SeguroController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Seguro seguro = new Seguro
            {
                SeguroId = id
            };

            seguroDAL.Remove(seguro);

        }

        #endregion

    }
}
