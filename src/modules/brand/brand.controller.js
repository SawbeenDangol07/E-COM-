const brandService = require("./brand.service");
const { UserRoles } = require("../../config/constant");

class BrandController {
  async create(req, res, next) {
    try {
      const data = await brandService.transformToBrandCreate(req);
      const brand = await brandService.storeBrand(data);

      res.json({
        data: brand,
        message: "Brand Created Successfully",
        status: "BRAND_CREATED",
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

      const { data, pagination } = await brandService.getAllRowsByFilter(
        filter,
        config,
      );
      res.json({
        data: data,
        message: "Brand list fetched successfully",
        status: "BRAND_LIST_FETCHED",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetail(req, res, next) {
    try {
      const brand = await brandService.getSingleRowsByFilter({
        _id: req.params.brandId,
      });
      if (!brand) {
        throw {
          code: 404,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND",
        };
      }

      res.json({
        data: brand,
        message: "Brand fetched successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async update(req, res, next) {
    try {
      const brand = await brandService.getSingleRowsByFilter({
        _id: req.params.brandId,
      });
      if (!brand) {
        throw {
          code: 404,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND",
        };
      }

      const data = await brandService.transformToBrandUpdate(req, brand);

      const update = await brandService.updateSingleRowByFilter(
        { _id: brand._id },
        data,
      );

      res.json({
        data: update,
        message: "Brand Update Successful",
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
        _id: req.params.brandId,
      };

      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const brand = await brandService.getSingleRowsByFilter(filter);

      if (!brand) {
        throw {
          code: 404,
          message: "Brand not Found",
          status: "BRAND_NOT_FOUND_ERR",
        };
      }

      const del = await brandService.delete(filter);

      res.json({
        data: del,
        message: "Brand Delted Successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetailBySlug(req, res, next) {
    try {
      const brandDetail = await brandService.getSingleRowsByFilter({
        slug: req.params.slug,
      });
      //to list all the products associate with this brand

      res.json({
        data: {
          brand: brandDetail,
          products: [],
        },
        message: "Brand detail",
        status: "OK",
        meta: {},
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
