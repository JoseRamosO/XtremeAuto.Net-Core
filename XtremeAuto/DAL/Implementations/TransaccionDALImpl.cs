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
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Transaccion> unidad;

        public bool Add(Transaccion entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddTransaccion] @VentaID, @TarjetaID, @FechaTransaccion, @FechaCorte, @InteresesMorosidad, @Pagado, @Precio";
                var param = new SqlParameter[]
                {

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

        public void AddRange(IEnumerable<Transaccion> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Transaccion> Find(Expression<Func<Transaccion, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Transaccion> Get(int id)
        {
            Transaccion transaccion = null;
            using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
            {

                transaccion = await unidad.genericDAL.Get(id);

            }
            return transaccion;
        }

        public async Task<IEnumerable<Transaccion>> GetAll()
        {
            List<Transaccion> transacciones = new List<Transaccion>();
            List<sp_GetAllTransacciones_Result> resultado;

            string sql = "[dbo].[sp_GetAllTransacciones]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllTransacciones_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                transacciones.Add(
                    new Transaccion
                    {
                        TransaccionId = item.TransaccionId,
                        VentaId = item.VentaId,
                        TarjetaId = item.TarjetaId,
                        FechaTransaccion = item.FechaTransaccion,
                        FechaCorte = item.FechaCorte,
                        InteresesMorosidad = item.InteresesMorosidad,
                        Pagado = item.Pagado,
                        Precio = item.Precio
                    }
                    );

            }
            return transacciones;

        }

        public bool Remove(Transaccion entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteTransaccion] @TransaccionID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@TransaccionID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.TransaccionId
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

                string sql = "exec [dbo].[sp_UpdateTransaccion] @TransaccionID, @VentaID, @TarjetaID, @FechaTransaccion, @FechaCorte, @InteresesMorosidad, @Pagado, @Precio";

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
