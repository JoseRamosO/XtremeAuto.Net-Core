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
    public class CarroVendidoDALImpl : ICarroVendidoDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<CarroVendido> unidad;

        public bool Add(CarroVendido entity)
        {
            try

            {
                string sql = "exec [dbo].[sp_AddCarroVendido] @RuedaID, @ColorID, @CarroModeloID, @SeguroID, @PrecioTotal";
                var param = new SqlParameter[]

                    {

                          new SqlParameter()
               {
                   ParameterName = "@RuedaID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.RuedaId
               },

                           new SqlParameter()
               {
                   ParameterName = "@ColorID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.ColorId
               },

                            new SqlParameter()
               {
                   ParameterName = "@CarroModeloID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.CarroModeloId
               },

                             new SqlParameter()
               {
                   ParameterName = "@SeguroID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.SeguroId
               },

                              new SqlParameter()
               {
                   ParameterName = "@PrecioTotal",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.PrecioTotal
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

        public void AddRange(IEnumerable<CarroVendido> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CarroVendido> Find(Expression<Func<CarroVendido, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public CarroVendido Get(int id)
        {
            CarroVendido carroVendido = null;
            using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
            {
                carroVendido = unidad.genericDAL.Get(id);


            }

            return carroVendido;
        }

        public IEnumerable<CarroVendido> GetAll()
        {
            IEnumerable<CarroVendido> carrosVendido = null;
            using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
            {
                carrosVendido = unidad.genericDAL.GetAll();


            }

            return carrosVendido;

        }

        public bool Remove(CarroVendido entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<CarroVendido> entities)
        {
            throw new NotImplementedException();
        }

        public CarroVendido SingleOrDefault(Expression<Func<CarroVendido, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(CarroVendido entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
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
