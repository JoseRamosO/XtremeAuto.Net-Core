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
    public class VentaDALImpl : IVentaDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ventum> unidad;

        public bool Add(Ventum entity)
        {
            try

            {
                string sql = "exec [dbo].[sp_AddVenta] @UsuarioID, @CarroVendidoID, @Total, @Meses, @Intereses, @SaldoPendiente, @SaldoAbonado";
                var param = new SqlParameter[]

                    {

                         new SqlParameter()
               {
                   ParameterName = "@UsuarioID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.UsuarioId
               },

                        new SqlParameter()
               {
                   ParameterName = "@CarroVendidoID",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.CarroVendidoId
               },

                           new SqlParameter()
               {
                   ParameterName = "@Total",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Total
               },

                            new SqlParameter()
               {
                   ParameterName = "@Meses",
                   SqlDbType = System.Data.SqlDbType.Int,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Meses
               },

                new SqlParameter()
               {
                   ParameterName = "@Intereses",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Intereses
               },

                new SqlParameter()
               {
                   ParameterName = "@SaldoPendiente",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.SaldoPendiente
               },
                new SqlParameter()
               {
                   ParameterName = "@SaldoAbonado",
                   SqlDbType = System.Data.SqlDbType.Decimal,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.SaldoAbonado
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

        public void AddRange(IEnumerable<Ventum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ventum> Find(Expression<Func<Ventum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Ventum Get(int id)
        {
            Ventum venta = null;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                venta = unidad.genericDAL.Get(id);


            }

            return venta;
        }

        public IEnumerable<Ventum> GetAll()
        {
            IEnumerable<Ventum> ventas = null;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                ventas = unidad.genericDAL.GetAll();


            }

            return ventas;

        }

        public bool Remove(Ventum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Ventum> entities)
        {
            throw new NotImplementedException();
        }

        public Ventum SingleOrDefault(Expression<Func<Ventum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Ventum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
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
