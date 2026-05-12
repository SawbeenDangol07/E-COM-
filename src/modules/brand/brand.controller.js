class BrandController {
  async create(req, res, next) {}
  async listAll(req, res, next) {}
  async getDetail(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
  async getDetailBySlug(req, res, next) {}
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
