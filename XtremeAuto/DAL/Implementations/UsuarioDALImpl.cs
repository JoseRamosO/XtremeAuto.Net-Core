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
                string sql = "exec [dbo].[sp_AddUsuario] @Nombre, @Apellido, @Salario, @Cedula, @Email, @PasswordHash, @SecurityStamp, @Telefono, @Username";
                var param = new SqlParameter[]

                    {

                         new SqlParameter()
               {
                   ParameterName = "@Nombre",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Nombre
               },

                        new SqlParameter()
               {
                   ParameterName = "@Apellido",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Apellido
               },

                           new SqlParameter()
               {
                   ParameterName = "@Salario",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Salario
               },

                            new SqlParameter()
               {
                   ParameterName = "@Cedula",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Cedula
               },

                new SqlParameter()
               {
                   ParameterName = "@Email",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Email
               },

                new SqlParameter()
               {
                   ParameterName = "@PasswordHash",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.PasswordHash
               },
                new SqlParameter()
               {
                   ParameterName = "@SecurityStamp",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.SecurityStamp
               },

                 new SqlParameter()
               {
                   ParameterName = "@Telefono",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Telefono
               },

                  new SqlParameter()
               {
                   ParameterName = "@Username",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Username
               }

                    };

                XtremeAutoNetCoreContext XtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();

                int resultado = XtremeAutoNetCoreContext.Database.ExecuteSqlRaw(sql, param);


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
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
                {
                    unidad.genericDAL.Update(entity);
                    unidad.Complete();
                }


                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
