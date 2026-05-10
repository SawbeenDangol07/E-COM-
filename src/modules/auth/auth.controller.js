const authsrvc = require("./auth.service");
const Usersrvc = require("../users/user.service");
const { AppConfig } = require("../../config/app.config");

class authController {
  async register(req, res, next) {
    try {
      const data = await authsrvc.transformForUser(req);
      const user = await Usersrvc.storeUser(data);
      let meta = {};
      if (AppConfig.environment === "local") {
        await authsrvc.AccActivationEmail(user);
      } else {
        meta = {
          activationLink: `${AppConfig.feUrl}/activate/${user.token}`,
        };
      }

      res.json({
        data: data,
        message: "User registered successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const authctrl = new authController();

module.exports = authctrl;
