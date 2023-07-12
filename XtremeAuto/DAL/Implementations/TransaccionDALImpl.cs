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

        public async Task<Transaccion> Get(int id)
        {
            Transaccion product;
            using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
            {
                product = await unidad.genericDAL.Get(id);
            }
            return product;
        }

        public async Task<IEnumerable<Transaccion>> GetAll()
        {
            IEnumerable<Transaccion> products;
            using (unidad = new UnidadDeTrabajo<Transaccion>(new XtremeAutoNetCoreContext()))
            {
                products = await unidad.genericDAL.GetAll();
            }
            return products;
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
