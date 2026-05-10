const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const authctrl = require("./auth.controller");
const { RegisterDTO } = require("./auth.validator");

const authRouter = require("express").Router();

authRouter.post(
  "/register",
  uploader().single("image"),
  bodyValidator(RegisterDTO),
  authctrl.register,
);

module.exports = authRouter;
