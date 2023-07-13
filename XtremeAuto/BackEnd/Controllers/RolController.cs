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
    public class RolController : ControllerBase
    {

        private IRolDAL rolDAL;

        private RolModel Convertir(Rol rol)
        {
            return new RolModel
            {
                RolId = rol.RolId,
                Nombre = rol.Nombre

            };
        }



        private Rol Convertir(RolModel rol)
        {
            return new Rol
            {
                RolId = rol.RolId,
                Nombre = rol.Nombre
            };
        }


        #region Constructores

        public RolController()
        {
            rolDAL = new RolDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<RolController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Rol> roles = await rolDAL.GetAll();
            List<RolModel> models = new List<RolModel>();

            foreach (var rol in roles)
            {

                models.Add(Convertir(rol));

            }

            return new JsonResult(models);
        }

        // GET api/<RolController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Rol rol = await rolDAL.Get(id);


            return new JsonResult(Convertir(rol));
        }
        #endregion

        #region Agregar


        // POST api/<RolController>
        [HttpPost]
        public JsonResult Post([FromBody] RolModel rol)
        {

            rolDAL.Add(Convertir(rol));
            return new JsonResult(rol);
        }

        #endregion

        #region Modificar


        // PUT api/<RolController>/5
        [HttpPut]
        public JsonResult Put([FromBody] RolModel rol)
        {
            rolDAL.Update(Convertir(rol));
            return new JsonResult(rol);
        }
        #endregion


        #region Eliminar
        // DELETE api/<RolController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Rol rol = new Rol
            {
                RolId = id
            };

            rolDAL.Remove(rol);

        }

        #endregion

    }
}
