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
    public class CarroModeloDALImpl : ICarroModeloDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<CarroModelo> unidad;

        public bool Add(CarroModelo entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroModelo>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<CarroModelo> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CarroModelo> Find(Expression<Func<CarroModelo, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public CarroModelo Get(int id)
        {
            CarroModelo carroModelo = null;
            using (unidad = new UnidadDeTrabajo<CarroModelo>(new XtremeAutoNetCoreContext()))
            {
                carroModelo = unidad.genericDAL.Get(id);
            }
            return carroModelo;
        }

        public IEnumerable<CarroModelo> GetAll()
        {
            IEnumerable<CarroModelo> carrosModelo = null;
            using (unidad = new UnidadDeTrabajo<CarroModelo>(new XtremeAutoNetCoreContext()))
            {
                carrosModelo = unidad.genericDAL.GetAll();
            }
            return carrosModelo;

        }

        public bool Remove(CarroModelo entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroModelo>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<CarroModelo> entities)
        {
            throw new NotImplementedException();
        }

        public CarroModelo SingleOrDefault(Expression<Func<CarroModelo, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(CarroModelo entity)
        {
            throw new NotImplementedException();
        }
    }
}
