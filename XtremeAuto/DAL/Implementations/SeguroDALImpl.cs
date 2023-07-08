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

        public Seguro Get(int id)
        {
            Seguro seguro = null;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                seguro = unidad.genericDAL.Get(id);
            }
            return seguro;
        }

        public IEnumerable<Seguro> GetAll()
        {
            IEnumerable<Seguro> seguros = null;
            using (unidad = new UnidadDeTrabajo<Seguro>(new XtremeAutoNetCoreContext()))
            {
                seguros = unidad.genericDAL.GetAll();
            }
            return seguros;

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
            throw new NotImplementedException();
        }
    }
}
