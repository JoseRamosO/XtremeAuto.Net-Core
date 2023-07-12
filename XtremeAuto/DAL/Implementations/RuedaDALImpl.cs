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
    public class RuedaDALImpl : IRuedaDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ruedum> unidad;

        public bool Add(Ruedum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
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
            Ruedum product;
            using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
            {
                product = await unidad.genericDAL.Get(id);
            }
            return product;
        }

        public async Task<IEnumerable<Ruedum>> GetAll()
        {
            IEnumerable<Ruedum> products;
            using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
            {
                products = await unidad.genericDAL.GetAll();
            }
            return products;
        }

        public bool Remove(Ruedum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
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
                using (unidad = new UnidadDeTrabajo<Ruedum>(new XtremeAutoNetCoreContext()))
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
