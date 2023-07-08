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

        public Ventum Get(int id)
        {
            Ventum venta = null;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                venta = unidad.genericDAL.Get(id);


            }

            return venta;
        }

        public IEnumerable<Ventum> GetAll()
        {
            IEnumerable<Ventum> ventas = null;
            using (unidad = new UnidadDeTrabajo<Ventum>(new XtremeAutoNetCoreContext()))
            {
                ventas = unidad.genericDAL.GetAll();


            }

            return ventas;

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
