const { CloudinaryConfig } = require("../config/app.config");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: CloudinaryConfig.className,
      api_key: CloudinaryConfig.apiKey,
      api_secret: CloudinaryConfig.apiSecrete,
    });
  }

  async singleFileUpload(filepath, dir = "/") {
    try {
      const response = await cloudinary.uploader.upload(filepath, {
        folder: "/api-55",
      });

      const optimize = cloudinary.url(response.public_id, {
        transformation: [
          { quality: "auto", aspect_ratio: "1.0", width: 1024 },
          { fetch_format: "auto" },
        ],
      });

      fs.unlinkSync(filepath);

      return {
        public_id: response.public_id,
        url: response.secure_url,
      };
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "Cloudinary file upload failed",
        status: "Cloudinary_File_Upload_Err",
      };
    }
  }
}

module.exports = new CloudinaryService();
