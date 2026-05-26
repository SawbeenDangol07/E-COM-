const checkLogin = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const categoryCtrl = require("./categories.controller");
const CategoryDTO = require("./category.validator");
const categoryRouter = require("express").Router();

categoryRouter.get("/", checkLogin(), categoryCtrl.listAll);
categoryRouter.post(
  "/",
  checkLogin(["seller"]),
  uploader().single("image"),
  bodyValidator(CategoryDTO),
  categoryCtrl.create,
);

categoryRouter.get("/:categoryId", checkLogin(), categoryCtrl.getDetail);
categoryRouter.put(
  "/:categoryId",
  checkLogin(["seller"]),
  uploader().single("logo"),
  bodyValidator(CategoryDTO),
  categoryCtrl.update,
);
categoryRouter.delete("/:categoryId", checkLogin(), categoryCtrl.delete);

module.exports = categoryRouter;
