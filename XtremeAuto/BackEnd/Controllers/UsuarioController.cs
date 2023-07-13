using BackEnd.Models;
using DAL.Implementations;
using DAL.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Helpers;
using Microsoft.AspNetCore.Authorization;
using BackEnd.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    //[Authorize]
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private IUsuarioDAL usuarioDAL;
        private BcryptPasswordHelper BcryptPasswordHelper;
        private readonly JWTServiceManage _jwttokenservice;
        private readonly IConfiguration _configuration;

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
            BcryptPasswordHelper = new BcryptPasswordHelper();
            _jwttokenservice = new JWTServiceManage(_configuration);
            usuarioDAL = new UsuarioDALImpl();

        }

        #endregion


        #region Consultas

        // GET: api/<RolController>
        [HttpGet]
        public async Task<JsonResult> GetAsync()
        {
            IEnumerable<Usuario> usuarios = await usuarioDAL.GetAll();
            List<UsuarioModel> models = new List<UsuarioModel>();

            foreach (var usuario in usuarios)
            {

                models.Add(Convertir(usuario));

            }

            return new JsonResult(models);
        }
       

        // GET api/<RolController>/5
        [HttpGet("{id}")]
        
        public async Task<JsonResult> Get(int id)
        {
            Usuario usuario = await usuarioDAL.Get(id);

            return new JsonResult(usuario);

        }
        #endregion

        #region Agregar


        // POST api/<RolController>
        [HttpPost]
        public JsonResult Post([FromBody] UsuarioModel usuario)
        {
            usuario.PasswordHash = BcryptPasswordHelper.HashPassword(usuario.PasswordHash);
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

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public JsonResult Authenticate(UsuarioModel usuario)
        {
            JWTTokens token = _jwttokenservice.Authenticate(usuario);

            if (token == null)
            {
                return new JsonResult(new { Message = "Correo Eléctronico o contraseña Incorrectos" });
            }

            return new JsonResult(token);
        }

    }
}
