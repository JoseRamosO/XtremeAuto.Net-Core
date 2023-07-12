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
    public class VentaDALImpl : IVentaDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Ventum> unidad;

        public bool Add(Ventum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Ventum> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ventum> Find(Expression<Func<Ventum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

      

        public async Task<IEnumerable<Ventum>> GetAll()
        {
            IEnumerable<Ventum> products;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                products = await unidad.genericDAL.GetAll();
            }
            return products;
        }
        public async Task<Ventum> Get(int id)
        {
            Ventum product;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                product = await unidad.genericDAL.Get(id);
            }
            return product;
        }

      

        public bool Remove(Ventum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Ventum> entities)
        {
            throw new NotImplementedException();
        }

        public Ventum SingleOrDefault(Expression<Func<Ventum, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Ventum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
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
