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
    public class RolDALImpl : IRolDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Rol> unidad;

        public bool Add(Rol entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Rol> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Rol> Find(Expression<Func<Rol, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Rol Get(int id)
        {
            Rol rol = null;
            using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
            {
                rol = unidad.genericDAL.Get(id);


            }

            return rol;
        }

        public IEnumerable<Rol> GetAll()
        {
            IEnumerable<Rol> roles = null;
            using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
            {
                roles = unidad.genericDAL.GetAll();


            }

            return roles;

        }

        public bool Remove(Rol entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
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
                using (unidad = new UnidadDeTrabajo<Rol>(new XtremeAutoNetCoreContext()))
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
