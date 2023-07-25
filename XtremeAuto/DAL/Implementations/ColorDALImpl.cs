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
    public class ColorDALImpl : IColorDAL
    {
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Color> unidad;

        public bool Add(Color entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddColor] @Nombre,@Imagen";
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

        public void AddRange(IEnumerable<Color> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Color> Find(Expression<Func<Color, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Color> Get(int id)
        {
            Color color = null;
            using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
            {

                color = await unidad.genericDAL.Get(id);

            }
            return color;
        }

        public async Task<IEnumerable<Color>> GetAll()
        {
            List<Color> colores = new List<Color>();
            List<sp_GetAllColores_Result> resultado;

            string sql = "[dbo].[sp_GetAllColores]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllColores_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                colores.Add(
                    new Color
                    {
                        ColorId = item.ColorId,
                        Nombre = item.Nombre,
                        Imagen= item.Imagen
                    }
                    );

            }
            return colores;
        }

        public bool Remove(Color entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteColor] @ColorID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@ColorID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.ColorId
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

        public void RemoveRange(IEnumerable<Color> entities)
        {
            throw new NotImplementedException();
        }

        public Color SingleOrDefault(Expression<Func<Color, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Color entity)
        {
            try
            {

                string sql = "exec [dbo].[sp_UpdateColor] @ColorID, @Nombre,@Imagen";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@ColorID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.ColorId
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
