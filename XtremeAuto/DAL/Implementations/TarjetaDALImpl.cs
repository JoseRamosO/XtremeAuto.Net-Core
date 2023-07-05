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
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Tarjetum> unidad;

        public bool Add(Tarjetum entity)
        {
            try

            {
                string sql = "exec [dbo].[sp_AddTarjeta] @UsuarioID, @Nombre, @NumeroDeTarjeta, @CVV, @FechaVencimiento";
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
                   ParameterName = "@Nombre",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Nombre
               },

                           new SqlParameter()
               {
                   ParameterName = "@NumeroDeTarjeta",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.NumeroDeTarjeta
               },

                            new SqlParameter()
               {
                   ParameterName = "@CVV",
                   SqlDbType = System.Data.SqlDbType.VarChar,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.Cvv
               },

                new SqlParameter()
               {
                   ParameterName = "@FechaVencimiento",
                   SqlDbType = System.Data.SqlDbType.DateTime,
                   Direction = System.Data.ParameterDirection.Input,
                   Value = entity.FechaVencimiento
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

        public void AddRange(IEnumerable<Tarjetum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tarjetum> Find(Expression<Func<Tarjetum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Tarjetum Get(int id)
        {
            Tarjetum tarjeta = null;
            using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
            {
                tarjeta = unidad.genericDAL.Get(id);


            }

            return tarjeta;
        }

        public IEnumerable<Tarjetum> GetAll()
        {
            IEnumerable<Tarjetum> tarjetas = null;
            using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
            {
                tarjetas = unidad.genericDAL.GetAll();


            }

            return tarjetas;

        }

        public bool Remove(Tarjetum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
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
                using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
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
