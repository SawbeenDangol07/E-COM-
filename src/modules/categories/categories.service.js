const slugify = require("slugify");
const cloudinaryService = require("../../Services/cloudinary.service");
const categoryModel = require("./categories.model");

class catergoryService {
  async transformToCategoryData(req) {
    try {
      const data = req.body;
      data.slug = slugify(data.name, {
        lower: true,
      });

      if (req.file) {
        data.image = await cloudinaryService.singleFileUpload(
          req.file.path,
          "category",
        );
      }

      if (!data.parent || data.parent === "" || data.parent === "null") {
        data.parent = null;
      }
      if (!data.brands || data.brands === "" || data.brands === "null") {
        data.brands = null;
      }
      data.createdBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeCategory(data) {
    try {
      let category = new categoryModel(data);
      return await category.save();
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new catergoryService();
