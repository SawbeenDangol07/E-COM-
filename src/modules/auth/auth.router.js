const checkLogin = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const authctrl = require("./auth.controller");
const { RegisterDTO, LoginDTO } = require("./auth.validator");

const authRouter = require("express").Router();

authRouter.post(
  "/register",
  uploader().single("image"),
  bodyValidator(RegisterDTO),
  authctrl.register,
);

authRouter.get("/activate/:token", authctrl.activateUserByToken);
authRouter.get("/reactive/:token", authctrl.reactivateUser);

authRouter.post("/login", bodyValidator(LoginDTO), authctrl.login);
authRouter.get("/me", checkLogin(), authctrl.getLoggedInUser);
module.exports = authRouter;
