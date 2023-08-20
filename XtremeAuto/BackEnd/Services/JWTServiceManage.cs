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


        public bool ValidateToken(string token)
        {
            try
            {
                var key = Encoding.UTF8.GetBytes(_configuration["JNSJDNFJNSDJKBNWER7345BWSEHFB34023HUNSFD02SDF2"]);
                var tokenValidationParameters = new TokenValidationParameters
                {
                    //ValidateIssuerSigningKey = true,
                    //IssuerSigningKey = Encoding.UTF8.GetBytes(builder.Configuration["JNSJDNFJNSDJKBNWER7345BWSEHFB34023HUNSFD02SDF2"]),
                    //ValidateIssuer = false,    // Set to true if you want to validate the issuer
                    //ValidateAudience = false,  // Set to true if you want to validate the audience
                    //ClockSkew = TimeSpan.Zero   // Optional: set clock skew tolerance

                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                // Create a JWT token handler.
                var tokenHandler = new JwtSecurityTokenHandler();

                // Validate the token.
                ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
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
                        Expires = DateTime.UtcNow.AddMinutes(100),
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

