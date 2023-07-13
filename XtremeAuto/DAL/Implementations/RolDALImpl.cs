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
    public class RolDALImpl : IRolDAL
    {
        private XtremeAutoNetCoreContext _xtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Rol> unidad;

        public bool Add(Rol entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_AddRol] @Nombre";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.VarChar,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
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

        public void AddRange(IEnumerable<Rol> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Rol> Find(Expression<Func<Rol, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Rol> Get(int id)
        {
            Rol rol = null;
            using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
            {

                rol = await unidad.genericDAL.Get(id);

            }
            return rol;
        }

        public async Task<IEnumerable<Rol>> GetAll()
        {
            List<Rol> roles = new List<Rol>();
            List<sp_GetAllRoles_Result> resultado;

            string sql = "[dbo].[sp_GetAllRoles]";
            XtremeAutoNetCoreContext xtremeAutoNetCoreContext = new XtremeAutoNetCoreContext();
            resultado = await xtremeAutoNetCoreContext.sp_GetAllRoles_Results
                        .FromSqlRaw(sql)
                        .ToListAsync();
            foreach (var item in resultado)
            {

                roles.Add(
                    new Rol
                    {
                        RolId = item.RolId,
                        Nombre = item.Nombre
                    }
                    );

            }
            return roles;
        }

        public bool Remove(Rol entity)
        {
            try
            {
                string sql = "exec [dbo].[sp_DeleteRol] @RolID";
                var param = new SqlParameter[]
                {

                    new SqlParameter()
                    {
                        ParameterName = "@RolID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RolId
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

        public void RemoveRange(IEnumerable<Rol> entities)
        {
            throw new NotImplementedException();
        }

        public Rol SingleOrDefault(Expression<Func<Rol, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Rol entity)
        {
            try
            {

                string sql = "exec [dbo].[sp_UpdateRol] @RolID, @Nombre";

                var param = new SqlParameter[]
                {
                    new SqlParameter()
                    {
                        ParameterName = "@RolID",
                        SqlDbType= System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.RolId
                    },

                     new SqlParameter()
                    {
                        ParameterName = "@Nombre",
                        SqlDbType= System.Data.SqlDbType.VarChar,

                        Direction = System.Data.ParameterDirection.Input,
                        Value= entity.Nombre
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
