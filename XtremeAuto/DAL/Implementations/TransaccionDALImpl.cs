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
    public class TransaccionDALImpl : ITransaccionDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Transaccion> unidad;

        public bool Add(Transaccion entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Transaccion> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Transaccion> Find(Expression<Func<Transaccion, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Transaccion Get(int id)
        {
            Transaccion transaccion = null;
            using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
            {
                transaccion = unidad.genericDAL.Get(id);
            }
            return transaccion;
        }

        public IEnumerable<Transaccion> GetAll()
        {
            IEnumerable<Transaccion> transacciones = null;
            using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
            {
                transacciones = unidad.genericDAL.GetAll();
            }
            return transacciones;

        }

        public bool Remove(Transaccion entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Transaccion> entities)
        {
            throw new NotImplementedException();
        }

        public Transaccion SingleOrDefault(Expression<Func<Transaccion, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Transaccion entity)
        {
            try
            {
                string sql = "EXEC [dbo].[sp_UpdateTransaccion] @TransaccionID, @VentaID, @TarjetaID, @FechaTransaccion, @FechaCorte, @InteresesMorosidad, @Pagado, @Precio";
                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@TransaccionID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.TransaccionId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@VentaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.VentaId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@TarjetaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.TarjetaId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FechaTransaccion",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FechaTransaccion
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FechaCorte",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FechaCorte
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@InteresesMorosidad",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.InteresesMorosidad
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Pagado",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Pagado
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
