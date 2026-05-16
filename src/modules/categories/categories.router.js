const checkLogin = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const categoryCtrl = require("./categories.controller");
const categoryRouter = require("express").Router();

categoryRouter.get("/", checkLogin(), categoryCtrl.listAll);
categoryRouter.post(
  "/",
  checkLogin(["seller"]),
  uploader().single("logo"),
  bodyValidator(BrandDTO),
  categoryCtrl.create,
);

categoryRouter.get("/:brandId", checkLogin(), categoryCtrl.getDetail);
categoryRouter.put(
  "/:brandId",
  checkLogin(["seller"]),
  uploader().single("logo"),
  bodyValidator(BrandDTO),
  categoryCtrl.update,
);
categoryRouter.delete("/:brandId", checkLogin(), categoryCtrl.delete);

module.exports = categoryRouter;
