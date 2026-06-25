const slugify = require("slugify");
const cloudinaryService = require("../../Services/cloudinary.service");

class ProductService {
  async transformToProduct(req) {
    try {
      const data = req.body;
      data.slug = slugify(data.name, {
        lower: true,
        strict: true,
        trim: true,
        replace: /[*+~.()'"!:@]/g,
      });

      //ruppee to paisa

      data.price = data.price * 100;
      data.afterDiscount = data.price - (data.price * data.discount) / 100;

      if (!data.category || data.category === "null") {
        data.category = null;
      }
      if (!data.brand || data.brand === "null") {
        data.brand = null;
      }
      if (!data.brand || data.brand === "null") {
        data.seller = req.loggedInUser._id;
      }

      data.createdBy = req.loggedInUser._id;

      if (req.files) {
        let images = [];
        req.files.map((image) => {
          images.push(
            cloudinaryService.singleFileUpload(image.path, "/products"),
          );
        });
      }
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new ProductService();
