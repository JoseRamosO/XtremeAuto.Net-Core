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
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<CarroVendido> unidad;

        public bool Add(CarroVendido entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddCarroVendido] @RuedaID, @ColorID, @CarroModeloID, @SeguroID";
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
                        ParameterName = "@ColorID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.ColorId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@CarroModeloID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroModeloId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@SeguroID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.SeguroId
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

        public void AddRange(IEnumerable<CarroVendido> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CarroVendido> Find(Expression<Func<CarroVendido, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<CarroVendido> Get(int id)
        {
            CarroVendido carroVendido = null;
            using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
            {

                carroVendido = await unidad.genericDAL.Get(id);

            }
            return carroVendido;
        }

        public async Task<IEnumerable<CarroVendido>> GetAll()
        {
            List<CarroVendido> carroVendidos = new List<CarroVendido>();
            List<sp_GetAllCarroVendidos_Result> resultado;

            string sql = "[dbo].[sp_GetAllCarroVendidos]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllCarroVendidos_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                carroVendidos.Add(
                    new CarroVendido
                    {
                        CarroVendidoId = item.CarroVendidoId,
                        RuedaId = item.RuedaId,
                        ColorId = item.ColorId,
                        CarroModeloId = item.CarroModeloId,
                        SeguroId = item.SeguroId,
                        PrecioTotal = item.PrecioTotal
                    }
                    );
            }
            return carroVendidos;


        }

        public bool Remove(CarroVendido entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteCarroVendido] @CarroVendidoID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@CarroVendidoID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroVendidoId
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

                string sql = "exec [dbo].[sp_UpdateCarroVendido] @CarroVendidoID, @RuedaID, @ColorID, @CarroModeloID, @SeguroID";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@CarroVendidoID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroVendidoId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@RuedaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RuedaId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@ColorID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.ColorId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@CarroModeloID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroModeloId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@SeguroID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.SeguroId
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
