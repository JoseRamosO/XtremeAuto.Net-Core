using DAL.Interfaces;
using Entities.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementations
{
    public class UsuarioDALImpl : IUsuarioDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Usuario> unidad;

        public bool Add(Usuario entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
                {
                    unidad.genericDAL.Add(entity);
                    unidad.Complete();
                }
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

        public Usuario Get(int id)
        {
            Usuario usuario = null;
            using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
            {
                usuario = unidad.genericDAL.Get(id);
            }
            return usuario;
        }

        public IEnumerable<Usuario> GetAll()
        {
            IEnumerable<Usuario> usuarios = null;
            using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
            {
                usuarios = unidad.genericDAL.GetAll();
            }
            return usuarios;

        }

        public bool Remove(Usuario entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
                {
                    unidad.genericDAL.Remove(entity);
                    unidad.Complete();
                }
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
                string sql = "EXEC [dbo].[sp_UpdateUsuario] @UsuarioID, @Nombre, @Apellido, @Salario, @Cedula, @Email, @PasswordHash, @SecurityStamp, @Telefono, @Username, @RolID, @LockoutEnabled, @FailedAttemptsCount, @LockoutEndDateUtc";
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
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Apellido",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
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
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cedula
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Email",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Email
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@PasswordHash",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.PasswordHash
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@SecurityStamp",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.SecurityStamp
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Telefono",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Telefono
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Username",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
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
