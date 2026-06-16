const { UserRoles } = require("../../config/constant");
const checkLogin = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const ProductDTO = require("./product.validator");

const productRouter = require("express").Router();

productRouter.post(
  "/",
  checkLogin([UserRoles.ADMIN, UserRoles.SELLER]),
  uploader().array["images"],
  bodyValidator(ProductDTO),
);

module.exports = productRouter;
