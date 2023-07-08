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
    public class RuedaDALImpl : IRuedaDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ruedum> unidad;

        public bool Add(Ruedum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Ruedum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ruedum> Find(Expression<Func<Ruedum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Ruedum Get(int id)
        {
            Ruedum rueda = null;
            using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
            {
                rueda = unidad.genericDAL.Get(id);
            }
            return rueda;
        }

        public IEnumerable<Ruedum> GetAll()
        {
            IEnumerable<Ruedum> ruedas = null;
            using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
            {
                ruedas = unidad.genericDAL.GetAll();
            }
            return ruedas;
        }

        public bool Remove(Ruedum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Ruedum> entities)
        {
            throw new NotImplementedException();
        }

        public Ruedum SingleOrDefault(Expression<Func<Ruedum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Ruedum entity)
        {
            try
            {
                string sql = "EXEC [dbo].[sp_UpdateRueda] @RuedaID, @Nombre, @Imagen, @Precio";
                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@RuedaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RuedaId
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
                        ParameterName = "@Imagen",
                        SqlDbType= System.Data.SqlDbType.Image,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Imagen
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Precio",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Precio
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
