﻿using BackEnd.Helpers;
using BackEnd.Models;
using DAL.Implementations;
using DAL.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using BackEnd.Helpers;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RuedaController : ControllerBase
    {

        private IRuedaDAL ruedaDAL;
        private ImagenesUploader ImagenesUploader;

        private RuedaModel Convertir(Ruedum rueda)
        {
            return new RuedaModel
            {
                RuedaId = rueda.RuedaId,
                Nombre = rueda.Nombre,
                Precio = rueda.Precio,
                Imagen = rueda.Imagen,
                FormFile = null

            };
        }



        private Ruedum Convertir(RuedaModel rueda)
        {
            return new Ruedum
            {
                RuedaId = rueda.RuedaId,
                Nombre = rueda.Nombre,
                Precio = rueda.Precio,
                Imagen = rueda.Imagen
            };
        }


        #region Constructores

        public RuedaController()
        {
            ruedaDAL = new RuedaDALImpl();
            ImagenesUploader = new ImagenesUploader();
        }

        #endregion


        #region Consultas

        // GET: api/<RuedaController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            IEnumerable<Ruedum> ruedas = await ruedaDAL.GetAll();
            List<RuedaModel> models = new List<RuedaModel>();

            foreach (var rueda in ruedas)
            {

                models.Add(Convertir(rueda));

            }

            return new JsonResult(models);
        }

        // GET api/<RuedaController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            Ruedum rueda = await ruedaDAL.Get(id);


            return new JsonResult(Convertir(rueda));
        }
        #endregion

        #region Agregar


        // POST api/<RuedaController>
        [HttpPost]
        public JsonResult Post([FromForm] RuedaModel rueda)
        {
            rueda.Imagen = ImagenesUploader.uploadImage(rueda.FormFile);
            ruedaDAL.Add(Convertir(rueda));
            return new JsonResult(rueda);
        }

        #endregion

        #region Modificar


        // PUT api/<RuedaController>/5
        [HttpPut]
        public JsonResult Put([FromForm] RuedaModel rueda)
        {
            if (rueda.FormFile != null)
            {
                rueda.Imagen = ImagenesUploader.uploadImage(rueda.FormFile);

            }
            ruedaDAL.Update(Convertir(rueda));
            return new JsonResult(rueda);
        }
        #endregion


        #region Eliminar
        // DELETE api/<RuedaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Ruedum rueda = new Ruedum
            {
                RuedaId = id
            };

            ruedaDAL.Remove(rueda);

        }

        #endregion

    }
}
