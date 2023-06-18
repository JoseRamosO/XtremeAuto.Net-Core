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
    public class UsuarioController : ControllerBase
    {

        private IUsuarioDAL usuarioDAL;

        private UsuarioModel Convertir(Usuario usuario)
        {
            return new UsuarioModel
            {
                UsuarioId = usuario.UsuarioId,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Salario = usuario.Salario,
                Cedula = usuario.Cedula,
                Email = usuario.Email,
                PasswordHash = usuario.PasswordHash,
                SecurityStamp = usuario.SecurityStamp,
                Telefono = usuario.Telefono,
                Username = usuario.Username,
                RolId = usuario.RolId,
                LockoutEnabled = usuario.LockoutEnabled,
                FailedAttemptsCount = usuario.FailedAttemptsCount,
                LockoutEndDateUtc = usuario.LockoutEndDateUtc
            };
        }



        private Usuario Convertir(UsuarioModel usuario)
        {
            return new Usuario
            {
                UsuarioId = usuario.UsuarioId,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Salario = usuario.Salario,
                Cedula = usuario.Cedula,
                Email = usuario.Email,
                PasswordHash = usuario.PasswordHash,
                SecurityStamp = usuario.SecurityStamp,
                Telefono = usuario.Telefono,
                Username = usuario.Username,
                RolId = usuario.RolId,
                LockoutEnabled = usuario.LockoutEnabled,
                FailedAttemptsCount = usuario.FailedAttemptsCount,
                LockoutEndDateUtc = usuario.LockoutEndDateUtc
            };
        }


        #region Constructores

        public UsuarioController()
        {
            usuarioDAL = new UsuarioDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<RolController>
        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<Usuario> usuarios = usuarioDAL.GetAll();
            List<UsuarioModel> models = new List<UsuarioModel>();

            foreach (var usuario in usuarios)
            {

                models.Add(Convertir(usuario));

            }

            return new JsonResult(models);
        }

        // GET api/<RolController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            Usuario usuarios = usuarioDAL.Get(id);


            return new JsonResult(Convertir(usuarios));
        }
        #endregion

        #region Agregar


        // POST api/<RolController>
        [HttpPost]
        public JsonResult Post([FromBody] UsuarioModel usuario)
        {

            usuarioDAL.Add(Convertir(usuario));
            return new JsonResult(usuario);
        }


        #endregion

        #region Modificar


        // PUT api/<RolController>/5
        [HttpPut]
        public JsonResult Put([FromBody] UsuarioModel usuario)
        {
            usuarioDAL.Update(Convertir(usuario));
            return new JsonResult(usuario);
        }
        #endregion


        #region Eliminar
        // DELETE api/<RolController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Usuario usuario = new Usuario
            {
                UsuarioId = id
            };

            usuarioDAL.Remove(usuario);

        }

        #endregion

    }
}
