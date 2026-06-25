const productService = require("./product.service");

class productController {
  async createProduct(req, res, next) {
    try {
      const data = await productService.transformToProduct;
    } catch (exception) {
      next(exception);
    }
  }
}

const productCtrl = new productController();

module.exports = productCtrl;
