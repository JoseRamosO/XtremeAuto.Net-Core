using DAL.Interfaces;
using Entities.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DAL.Implementations
{
    public class CarroModeloDALImpl : ICarroModeloDAL
    {
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<CarroModelo> unidad;

        public bool Add(CarroModelo entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddCarroModelo] @Disponible, @Tipo, @Marca, @Modelo, @Descripcion, @Precio, @Imagen,@Cantidad";
                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@Disponible",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Disponible
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Tipo",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Tipo
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Marca",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Marca
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Modelo",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Modelo
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Descripcion",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Descripcion
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Precio",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Precio
                    },
                     new SqlParameter()
                    {
                        ParameterName = "@Imagen",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Imagen
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Cantidad",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cantidad
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

        public void AddRange(IEnumerable<CarroModelo> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CarroModelo> Find(Expression<Func<CarroModelo, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<CarroModelo> Get(int id)
        {
            CarroModelo carroModelo = null;
            using (unidad = new UnidadDeTrabajo<CarroModelo>(new XtremeAutoNetCoreContext()))
            {

                carroModelo = await unidad.genericDAL.Get(id);

            }
            return carroModelo;
        }

        public async Task<IEnumerable<CarroModelo>> GetAll()
        {
            List<CarroModelo> carroModelos = new List<CarroModelo>();
            List<sp_GetAllCarroModelos_Result> resultado;

            string sql = "[dbo].[sp_GetAllCarroModelos]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllCarroModelos_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {
                carroModelos.Add(
                    new CarroModelo
                    {
                        CarroModeloId = item.CarroModeloId,
                        Disponible = item.Disponible,
                        Tipo = item.Tipo,
                        Marca = item.Marca,
                        Modelo = item.Modelo,
                        Descripcion = item.Descripcion,
                        Precio = item.Precio,
                        Imagen= item.Imagen,
                        Cantidad = item.Cantidad
                    }
                    );
            }
            return carroModelos;

        }

        public bool Remove(CarroModelo entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteCarroModelo] @CarroModeloID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@CarroModeloID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroModeloId
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

        public void RemoveRange(IEnumerable<CarroModelo> entities)
        {
            throw new NotImplementedException();
        }

        public CarroModelo SingleOrDefault(Expression<Func<CarroModelo, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(CarroModelo entity)
        {
            try
            {

                string sql = "exec [dbo].[sp_UpdateCarroModelo] @CarroModeloID, @Disponible, @Tipo, @Marca, @Modelo, @Descripcion, @Precio, @Imagen,@Cantidad";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@CarroModeloID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.CarroModeloId
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Disponible",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Disponible
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Tipo",

                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Tipo
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Marca",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Marca
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Modelo",
                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Modelo
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Descripcion",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Descripcion
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Precio",
                        SqlDbType= System.Data.SqlDbType.Decimal,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Precio
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Imagen",
                        SqlDbType= System.Data.SqlDbType.NVarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Imagen
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@Cantidad",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cantidad
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
