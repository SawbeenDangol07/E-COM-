const brandService = require("./brand.service");

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
    const data = brandService.getAllRowsByFilter()
  }
  async getDetail(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
  async getDetailBySlug(req, res, next) {}
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
