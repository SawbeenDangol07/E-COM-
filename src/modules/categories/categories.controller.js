const categoriesService = require("./categories.service");

class categoryController {
  async create(req, res, next) {
    try {
      const data = await categoriesService.transformToCategoryData(req);
      const category = await categoriesService.storeCategory(data);
      res.json({
        data: category,
        message: "Category added sucessfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllCategories() {
    try {
      
    } catch (exception) {
      next(exception);
    }
  }
}

const categoryCtrl = new categoryController();
module.exports = categoryCtrl;
