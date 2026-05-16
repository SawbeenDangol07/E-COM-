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

  async transformToBrandUpdate(req, brand) {
    try {
      const data = req.body;

      if (req.file) {
        data.logo = await CloudinaryService.singleFileUpload(
          req.file.path,
          "/brand",
        );
      } else {
        data.logo = brand.logo;
      }

      data.updatedBy = req.loggedInUser._id;

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

      const skip = (page - 1) * limit;

      const total = await BrandModel.countDocuments(filter);

      const data = await BrandModel.find(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "status",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "status",
        ])
        .skip(skip)
        .limit(limit);

      return { data, pagination: { page: page, limit: limit, total: total } };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowsByFilter(filter) {
    try {
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "status",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "status",
        ]);

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const updateResponse = await BrandModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return updateResponse;
    } catch (exception) {
      throw exception;
    }
  }

  async delete(filter) {
    try {
      const del = await BrandModel.findOneAndDelete(filter);
      return del;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService();
