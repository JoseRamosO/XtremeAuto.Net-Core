using DAL.Interfaces;
using Entities.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementations
{
    public class UsuarioDALImpl : IUsuarioDAL
    {
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Usuario> unidad;

        public bool Add(Usuario entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddUsuario] @Nombre,@Apellido, @Salario, @Cedula, @Email, @PasswordHash, @SecurityStamp,@Telefono,@Username,@RolID ,@LockoutEnabled,@FailedAttemptsCount,@LockoutEndDateUtc";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Apellido",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Apellido
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Salario",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Salario
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Cedula",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cedula
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Email",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Email
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@PasswordHash",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.PasswordHash
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@SecurityStamp",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.SecurityStamp
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Telefono",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Telefono
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Username",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Username
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@RolID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RolId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEnabled",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEnabled
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FailedAttemptsCount",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FailedAttemptsCount
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEndDateUtc",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEndDateUtc
                    }
                };
                XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
                int resultado = xtremeAutoNetCoreContext.Database.ExecuteSqlRaw(sql, param);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void AddRange(IEnumerable<Usuario> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Usuario> Find(Expression<Func<Usuario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Usuario> Get(int id)
        {
            Usuario usuario = null;
            using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
            {

                usuario = await unidad.genericDAL.Get(id);

            }
            return usuario;
        }

        public async Task<IEnumerable<Usuario>> GetAll()
        {

            List<Usuario> usuarios = new List<Usuario>();
            List<sp_GetAllUsuarios_Result> resultado;

            string sql = "[dbo].[sp_GetAllUsuarios]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllUsuarios_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {
                usuarios.Add(
                    new Usuario
                    {
                        UsuarioId = item.UsuarioId,
                        Nombre = item.Nombre,
                        Apellido = item.Apellido,
                        Salario = item.Salario,
                        Cedula = item.Cedula,
                        Email = item.Email,
                        PasswordHash = item.PasswordHash,
                        SecurityStamp = item.SecurityStamp,
                        Telefono = item.Telefono,
                        Username = item.Username,
                        RolId = item.RolId,
                        LockoutEnabled = item.LockoutEnabled,
                        FailedAttemptsCount = item.FailedAttemptsCount,
                        LockoutEndDateUtc = item.LockoutEndDateUtc
                    }
                    );

            }
            return usuarios;

        }

        public bool Remove(Usuario entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteUsuario] @UsuarioID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@UsuarioID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.UsuarioId
                    }
                };
                XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
                int resultado = xtremeAutoNetCoreContext.Database.ExecuteSqlRaw(sql, param);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void RemoveRange(IEnumerable<Usuario> entities)
        {
            throw new NotImplementedException();
        }

        public Usuario SingleOrDefault(Expression<Func<Usuario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Usuario entity)
        {
            try
            {

                string sql = "exec [dbo].[sp_UpdateUsuario] @UsuarioID, @Nombre,@Apellido, @Salario, @Cedula, @Email, @PasswordHash, @SecurityStamp,@Telefono,@Username,@RolID ,@LockoutEnabled,@FailedAttemptsCount,@LockoutEndDateUtc";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@UsuarioID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.UsuarioId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Nombre",

                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Apellido",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Apellido
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Salario",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Salario
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Cedula",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cedula
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Email",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Email
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@PasswordHash",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.PasswordHash
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@SecurityStamp",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.SecurityStamp
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Telefono",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Telefono
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Username",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Username
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@RolID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RolId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEnabled",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEnabled
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FailedAttemptsCount",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FailedAttemptsCount
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEndDateUtc",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEndDateUtc
                    }



                };
                XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
                int resultado = xtremeAutoNetCoreContext.Database.ExecuteSqlRaw(sql, param);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
