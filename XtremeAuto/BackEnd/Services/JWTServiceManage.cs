using System;
using BackEnd.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackEnd.Services;


namespace BackEnd.Services
{
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConfiguration _configuration;

        public JWTServiceManage(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public JWTTokens Authenticate(UsuarioModel usuario)
        {

            //if (!_dbcontext.Users.Any(e => e.UserName == users.UserName && e.Password == users.Password))
            //{
            //    return null;
            //}

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

