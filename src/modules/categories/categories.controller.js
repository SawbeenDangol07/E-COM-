const categoriesService = require("./categories.service");

class categoryController {
  async create(req, res, next) {
    try {
      const data = await categoriesService.transformToCategoryData(req);
      const category = await categoriesService.storeCategory(data);
    } catch (exception) {}
  }
}

const categoryCtrl = new categoryController();
module.exports = categoryCtrl;
