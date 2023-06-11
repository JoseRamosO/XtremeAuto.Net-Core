using DAL.Interfaces;
using Entities.Entities;
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
                using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
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
