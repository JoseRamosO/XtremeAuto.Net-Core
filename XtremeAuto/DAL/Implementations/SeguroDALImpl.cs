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
    public class SeguroDALImpl : ISeguroDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Seguro> unidad;

        public bool Add(Seguro entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Seguro> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Seguro> Find(Expression<Func<Seguro, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Seguro> Get(int id)
        {
            Seguro product;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                product = await unidad.genericDAL.Get(id);
            }
            return product;
        }

        public async Task<IEnumerable<Seguro>> GetAll()
        {
            IEnumerable<Seguro> products;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                products = await unidad.genericDAL.GetAll();
            }
            return products;
        }

        public bool Remove(Seguro entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Seguro> entities)
        {
            throw new NotImplementedException();
        }

        public Seguro SingleOrDefault(Expression<Func<Seguro, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Seguro entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
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
