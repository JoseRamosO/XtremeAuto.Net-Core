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
    public class RolDALImpl : IRolDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Rol> unidad;

        public bool Add(Rol entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Rol> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Rol> Find(Expression<Func<Rol, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Rol Get(int id)
        {
            Rol rol = null;
            using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
            {
                rol = unidad.genericDAL.Get(id);
            }
            return rol;
        }

        public IEnumerable<Rol> GetAll()
        {
            IEnumerable<Rol> roles = null;
            using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
            {
                roles = unidad.genericDAL.GetAll();
            }
            return roles;
        }

        public bool Remove(Rol entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Rol> entities)
        {
            throw new NotImplementedException();
        }

        public Rol SingleOrDefault(Expression<Func<Rol, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Rol entity)
        {
            try
            {
                string sql = "EXEC [dbo].[sp_UpdateRol] @RolID, @Nombre";
                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@RolID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RolId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
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
