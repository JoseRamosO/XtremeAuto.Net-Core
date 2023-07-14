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
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ventum> unidad;

        public bool Add(Ventum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddVenta] @UsuarioID,@CarroVendidoID,@Meses";
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
                        ParameterName = "@CarroVendidoID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroVendidoId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Meses",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Meses
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

        public void AddRange(IEnumerable<Ventum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ventum> Find(Expression<Func<Ventum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Ventum> Get(int id)
        {
            Ventum venta = null;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {

                venta = await unidad.genericDAL.Get(id);

            }
            return venta;
        }

        public async Task<IEnumerable<Ventum>> GetAll()
        {
            List<Ventum> ventas = new List<Ventum>();
            List<sp_GetAllVentas_Result> resultado;

            string sql = "[dbo].[sp_GetAllVentas]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllVentas_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                ventas.Add(
                    new Ventum
                    {
                        VentaId = item.VentaId,
                        UsuarioId = item.UsuarioId,
                        CarroVendidoId = item.CarroVendidoId,
                        Total = item.Total,
                        Meses = item.Meses,
                        Intereses = item.Intereses,
                        SaldoPendiente = item.SaldoPendiente,
                        SaldoAbonado = item.SaldoAbonado
                    }
                    );

            }
            return ventas;

        }

        public bool Remove(Ventum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteVenta] @VentaID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@VentaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.VentaId
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

                string sql = "exec [dbo].[sp_UpdateVenta] @VentaID, @UsuarioID,@CarroVendidoID, @Meses";

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
                        ParameterName = "@UsuarioID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.UsuarioId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@CarroVendidoID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroVendidoId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Meses",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Meses
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
