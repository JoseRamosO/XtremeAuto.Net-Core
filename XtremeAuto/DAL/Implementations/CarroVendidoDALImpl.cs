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
    public class CarroVendidoDALImpl : ICarroVendidoDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<CarroVendido> unidad;

        public bool Add(CarroVendido entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<CarroVendido> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CarroVendido> Find(Expression<Func<CarroVendido, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public CarroVendido Get(int id)
        {
            CarroVendido carroVendido = null;
            using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
            {
                carroVendido = unidad.genericDAL.Get(id);
            }

            return carroVendido;
        }

        public IEnumerable<CarroVendido> GetAll()
        {
            IEnumerable<CarroVendido> carrosVendido = null;
            using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
            {
                carrosVendido = unidad.genericDAL.GetAll();
            }
            return carrosVendido;

        }

        public bool Remove(CarroVendido entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<CarroVendido>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<CarroVendido> entities)
        {
            throw new NotImplementedException();
        }

        public CarroVendido SingleOrDefault(Expression<Func<CarroVendido, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(CarroVendido entity)
        {
            throw new NotImplementedException();
        }
    }
}
