const { config } = require("dotenv");
const CloudinaryService = require("./../../Services/cloudinary.service");

const BrandModel = require("./brand.model");
const slugify = require("slugify");
class BrandService {
  async transformToBrandCreate(req) {
    try {
      const data = req.body;
      data.slug = slugify(data.name, {
        lower: true,
        trim: true,
        strict: true,
        remove: true,
      });
      if (req.file) {
        data.logo = await CloudinaryService.singleFileUpload(
          req.file.path,
          "/brand",
        );
      }

      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeBrand(data) {
    try {
      const brand = new BrandModel(data);
      return await brand.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, config = { page: 1, limit: 20 }) {
    try {
      const page = config.page || 1;
      const limit = +config.limit || 20;

      const data = await BrandModel.find(filter);
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService();
