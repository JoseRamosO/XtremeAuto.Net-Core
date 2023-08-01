using System;
using BackEnd.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackEnd.Services;
using Entities.Entities;
using BackEnd.Helpers;

namespace BackEnd.Services
{
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConfiguration _configuration;
        private XtremeAutoNetCoreContext xtremeAutoNetCoreContext;
        private BcryptPasswordHelper BcryptPasswordHelper;

        public JWTServiceManage(IConfiguration configuration)
        {
            _configuration = configuration;
            xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            BcryptPasswordHelper = new BcryptPasswordHelper();
        }

        public JWTTokens Authenticate(UsuarioModel usuario)
        {

            Usuario? dbUserProvider = xtremeAutoNetCoreContext.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);

            if(dbUserProvider != null)
            {

                Boolean passwordMatched = BcryptPasswordHelper.VerifyPassword(usuario.PasswordHash, dbUserProvider.PasswordHash);

                if (passwordMatched)
                {
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
                    return new JWTTokens { Token = tokenhandler.WriteToken(toekn), currentUser = dbUserProvider, authState = passwordMatched };
                }
                else
                {
                    return null;

                }

            } else
            {
                return null;
            }
            
        }
    }
}

