﻿using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementations
{
    public class ColorDALImpl : IColorDAL
    {
        private XtremeAutoNetCoreContext _XtremeAutoNetCoreContext;
        private UnidadDeTrabajo<Color> unidad;

        public bool Add(Color entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
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

        public void AddRange(IEnumerable<Color> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Color> Find(Expression<Func<Color, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Color Get(int id)
        {
            Color color = null;
            using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
            {
                color = unidad.genericDAL.Get(id);


            }

            return color;
        }

        public IEnumerable<Color> GetAll()
        {
            IEnumerable<Color> colores = null;
            using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
            {
                colores = unidad.genericDAL.GetAll();


            }

            return colores;

        }

        public bool Remove(Color entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
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

        public void RemoveRange(IEnumerable<Color> entities)
        {
            throw new NotImplementedException();
        }

        public Color SingleOrDefault(Expression<Func<Color, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Color entity)
        {
            try
            {
                using (unidad = new UnidadDeTrabajo<Color>(new XtremeAutoNetCoreContext()))
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
