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
                string parentFolderName = "assets";
                DateTime currentDate = DateTime.Now;
                string formattedDate = currentDate.ToString("yyyyMMdd");

                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", parentFolderName, formattedDate );
                string finalFolderPath = Path.Combine(folderPath, uploadImage.FileName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                using (Stream stream = new FileStream(finalFolderPath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                    return "/assets/" + formattedDate + "/" + uploadImage.FileName;
                }
               
            }
            catch (Exception)
            {
                return "ERROR";
            }
        }
	}
}

