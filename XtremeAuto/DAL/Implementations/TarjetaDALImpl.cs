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
    public class TarjetaDALImpl : ITarjetaDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Tarjetum> unidad;

        public bool Add(Tarjetum entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Tarjetum>(new XtremeAutoNetCoreContext()))
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
