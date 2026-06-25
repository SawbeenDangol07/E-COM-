const { UserRoles } = require("../../config/constant");
const productService = require("./product.service");

class productController {
  async createProduct(req, res, next) {
    try {
      const data = await productService.transformToProduct(req);
      const product = await productService.createProduct(data);
      res.json({
        data: product,
        message: "Product created successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      let filter = {};
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          createdBy: req.loggedInUser._id,
        };
      }

      // search implementation

      if (req.query.search) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i"),
          description: new RegExp(req.query.search, "i"),
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }
      const data = await productService.getAllRowByFilter(filter);
    } catch (exception) {
      next(exception);
    }
  }
}

const productCtrl = new productController();

module.exports = productCtrl;
