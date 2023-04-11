const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")

class Multer {
  constructor(folder) {
    cloudinary.config({
      cloud_name: "dof16suwx",
      api_key: "791796788616623",
      api_secret: "QY6T0GstFfdf5y8cRELEFgrx8UM"
    });
    
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: folder
      }
    })
    
    this.parser = multer({ storage: storage }).array("images")
  }
  
  async save(req, res) {
    return new Promise((resolve, reject) => {
      this.parser(req, res, error => {
        if(error) {
          resolve({
            done: false,
            error: "Upload Failed",
            info: error
          })
        } else {
          resolve({
            done: true,
            body: req.body,
            files: req.files
          })
        }
      })
    })
  }
}

module.exports = Multer