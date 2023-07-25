using System;
using System.IO;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Helpers
{
	public class ImagenesUploader
	{
        public string uploadImage(IFormFile uploadImage)
        {

            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", uploadImage.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }
                return "http://localhost:5088/" + uploadImage.FileName;

            }
            catch (Exception)
            {
                return "ERROR";
            }
        }
	}
}

