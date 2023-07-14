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
    public class TarjetaDALImpl : ITarjetaDAL
    {
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Tarjetum> unidad;

        public bool Add(Tarjetum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddTarjeta] @UsuarioID, @Nombre, @NumeroDeTarjeta, @CVV, @FechaVencimiento, @LockoutEnabled";
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
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@NumeroDeTarjeta",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.NumeroDeTarjeta
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@CVV",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cvv
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FechaVencimiento",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FechaVencimiento
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEnabled",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEnabled
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

        public void AddRange(IEnumerable<Tarjetum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tarjetum> Find(Expression<Func<Tarjetum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Tarjetum> Get(int id)
        {
            Tarjetum tarjeta = null;
            using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
            {

                tarjeta = await unidad.genericDAL.Get(id);

            }
            return tarjeta;
        }

        public async Task<IEnumerable<Tarjetum>> GetAll()
        {
            List<Tarjetum> tarjetas = new List<Tarjetum>();
            List<sp_GetAllTarjetas_Result> resultado;

            string sql = "[dbo].[sp_GetAllTarjetas]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllTarjetas_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                tarjetas.Add(
                    new Tarjetum
                    {
                        TarjetaId = item.TarjetaId,
                        UsuarioId = item.UsuarioId,
                        Nombre = item.Nombre,
                        NumeroDeTarjeta = item.NumeroDeTarjeta,
                        Cvv = item.Cvv,
                        FechaVencimiento = item.FechaVencimiento,
                        LockoutEnabled= item.LockoutEnabled
                    }
                    );

            }
            return tarjetas;

        }

        public bool Remove(Tarjetum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteTarjeta] @TarjetaID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@TarjetaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.TarjetaId
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

        public void RemoveRange(IEnumerable<Tarjetum> entities)
        {
            throw new NotImplementedException();
        }

        public Tarjetum SingleOrDefault(Expression<Func<Tarjetum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Tarjetum entity)
        {
            try
            {

                string sql = "exec [dbo].[sp_UpdateTarjeta] @TarjetaID, @UsuarioID, @Nombre, @NumeroDeTarjeta, @CVV, @FechaVencimiento,@LockoutEnabled";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@TarjetaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.TarjetaId
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
                        ParameterName = "@Nombre",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@NumeroDeTarjeta",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.NumeroDeTarjeta
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@CVV",

                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Cvv
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@FechaVencimiento",
                        SqlDbType= System.Data.SqlDbType.DateTime,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.FechaVencimiento
                    },
                    new SqlParameter()
                    {
                        ParameterName = "@LockoutEnabled",
                        SqlDbType= System.Data.SqlDbType.Bit,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.LockoutEnabled
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
