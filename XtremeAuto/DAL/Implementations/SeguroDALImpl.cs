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
    public class SeguroDALImpl : ISeguroDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Seguro> unidad;

        public bool Add(Seguro entity)
        {
            try

            {
                string sql = "exec [dbo].[sp_AddSeguro] @Nombre, @Plazo, @Precio";
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
                   ParameterName = "@Plazo",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Plazo
               },

                new SqlParameter()
               {
                   ParameterName = "@Precio",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Precio
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

        public void AddRange(IEnumerable<Seguro> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Seguro> Find(Expression<Func<Seguro, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Seguro Get(int id)
        {
            Seguro seguro = null;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                seguro = unidad.genericDAL.Get(id);


            }

            return seguro;
        }

        public IEnumerable<Seguro> GetAll()
        {
            IEnumerable<Seguro> seguros = null;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                seguros = unidad.genericDAL.GetAll();


            }

            return seguros;

        }

        public bool Remove(Seguro entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Seguro> entities)
        {
            throw new NotImplementedException();
        }

        public Seguro SingleOrDefault(Expression<Func<Seguro, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Seguro entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
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
