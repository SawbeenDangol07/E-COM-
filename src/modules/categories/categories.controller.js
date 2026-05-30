const categoryService = require("./categories.service");
const { UserRoles } = require("../../config/constant");

class CategoryController {
  async create(req, res, next) {
    try {
      const data = await categoryService.transformToCategoryCreate(req);
      const category = await categoryService.storeCategory(data);

      res.json({
        data: category,
        message: "Category Created Successfully",
        status: "CATEGORY_CREATED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAll(req, res, next) {
    try {
      let filter = {};
      // let searchKeyword = req.query.search || req.query.keyword;
      if (req.query.search) {
        filter = {
          $or: [{ name: new RegExp(req.query.search, "i") }],
        };
      }
      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      const config = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 20,
      };

      const { data, pagination } = await categoryService.getAllRowsByFilter(
        filter,
        config,
      );
      res.json({
        data: data,
        message: "Category list fetched successfully",
        status: "CATEGORY_LIST_FETCHED",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetail(req, res, next) {
    try {
      const category = await categoryService.getSingleRowsByFilter({
        _id: req.params.categoryId,
      });
      if (!category) {
        throw {
          code: 404,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      res.json({
        data: category,
        message: "Category fetched successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async update(req, res, next) {
    try {
      const category = await categoryService.getSingleRowsByFilter({
        _id: req.params.categoryId,
      });
      if (!category) {
        throw {
          code: 404,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const data = await categoryService.transformToCategoryUpdate(
        req,
        category,
      );

      const update = await categoryService.updateSingleRowByFilter(
        { _id: category._id },
        data,
      );

      res.json({
        data: update,
        message: "Category Update Successful",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async delete(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;

      let filter = {
        _id: req.params.categoryId,
      };

      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const category = await categoryService.getSingleRowsByFilter(filter);

      if (!category) {
        throw {
          code: 404,
          message: "Category not Found",
          status: "CATEGORY_NOT_FOUND_ERR",
        };
      }

      const del = await categoryService.delete(filter);

      res.json({
        data: del,
        message: "Category Delted Successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetailBySlug(req, res, next) {
    try {
      const categoryDetail = await categoryService.getSingleRowsByFilter({
        slug: req.params.slug,
      });
      //to list all the products associate with this category

      res.json({
        data: {
          category: categoryDetail,
          products: [],
        },
        message: "Category detail",
        status: "OK",
        meta: {},
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const categoryCtrl = new CategoryController();

module.exports = categoryCtrl;
