using System;
using BackEnd.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackEnd.Services;
using Entities.Entities;

namespace BackEnd.Services
{
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConfiguration _configuration;
        private XtremeAutoNetCoreContext _context;

        public JWTServiceManage(IConfiguration configuration)
        {
            _configuration = configuration;
            _context= new XtremeAutoNetCoreContext();
        }

        public JWTTokens Authenticate(UsuarioModel usuario)
        {

            if (!_context.Usuarios.Any(e => e.Username == usuario.Username && e.PasswordHash == usuario.PasswordHash))
            {
                return null;
            }

            var tokenhandler = new JwtSecurityTokenHandler();
            var tkey = Encoding.UTF8.GetBytes("JNSJDNFJNSDJKBNWER7345BWSEHFB34023HUNSFD02SDF2");
            var ToeknDescp = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.Username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var toekn = tokenhandler.CreateToken(ToeknDescp);

            return new JWTTokens { Token = tokenhandler.WriteToken(toekn), refToken = usuario.Email };
        }
    }
}

