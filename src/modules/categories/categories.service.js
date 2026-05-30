const CloudinaryService = require("./../../Services/cloudinary.service");

const CategoryModel = require("./categories.model");
const slugify = require("slugify");
class CategoryService {
  async transformToCategoryCreate(req) {
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
          "/category",
        );
      }

      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transformToCategoryUpdate(req, category) {
    try {
      const data = req.body;

      if (req.file) {
        data.logo = await CloudinaryService.singleFileUpload(
          req.file.path,
          "/category",
        );
      } else {
        data.logo = category.logo;
      }

      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeCategory(data) {
    try {
      const category = new CategoryModel(data);
      return await category.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, config = { page: 1, limit: 20 }) {
    try {
      const page = config.page || 1;
      const limit = +config.limit || 20;

      const skip = (page - 1) * limit;

      const total = await CategoryModel.countDocuments(filter);

      const data = await CategoryModel.find(filter)
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
      const data = await CategoryModel.findOne(filter)
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
      const updateResponse = await CategoryModel.findOneAndUpdate(
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
      const del = await CategoryModel.findOneAndDelete(filter);
      return del;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new CategoryService();
