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
    public class UsuarioDALImpl : IUsuarioDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Usuario> unidad;

        public bool Add(Usuario entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Usuario> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Usuario> Find(Expression<Func<Usuario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Usuario Get(int id)
        {
            Usuario usuario = null;
            using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
            {
                usuario = unidad.genericDAL.Get(id);


            }

            return usuario;
        }

        public IEnumerable<Usuario> GetAll()
        {
            IEnumerable<Usuario> usuarios = null;
            using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
            {
                usuarios = unidad.genericDAL.GetAll();


            }

            return usuarios;

        }

        public bool Remove(Usuario entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Usuario> entities)
        {
            throw new NotImplementedException();
        }

        public Usuario SingleOrDefault(Expression<Func<Usuario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Usuario entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Usuario>(new XtremeAutoNetCoreContext()))
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
