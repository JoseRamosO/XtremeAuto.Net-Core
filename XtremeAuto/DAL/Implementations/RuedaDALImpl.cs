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
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ruedum> unidad;

        public bool Add(Ruedum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddRueda] @Nombre, @Precio, @Imagen";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
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

        public void AddRange(IEnumerable<Ruedum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ruedum> Find(Expression<Func<Ruedum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Ruedum> Get(int id)
        {
            Ruedum rueda = null;
            using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
            {

                rueda = await unidad.genericDAL.Get(id);

            }
            return rueda;
        }

        public async Task<IEnumerable<Ruedum>> GetAll()
        {
            List<Ruedum> ruedas = new List<Ruedum>();
            List<sp_GetAllRuedas_Result> resultado;

            string sql = "[dbo].[sp_GetAllRuedas]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllRuedas_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                ruedas.Add(
                    new Ruedum
                    {
                        RuedaId = item.RuedaId,
                        Nombre = item.Nombre,
                        Precio= item.Precio,
                        Imagen= item.Imagen
                    }
                    );

            }
            return ruedas;
        }

        public bool Remove(Ruedum entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteRueda] @RuedaID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@RuedaID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RuedaId
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

                string sql = "exec [dbo].[sp_UpdateRueda] @RuedaID, @Nombre, @Imagen, @Precio";

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
                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
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
