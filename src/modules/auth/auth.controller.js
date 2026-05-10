const authsrvc = require("./auth.service");
const Usersrvc = require("../users/user.service");
const { AppConfig } = require("../../config/app.config");

const { Status } = require("../../config/constant");

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

  async activateUserByToken(req, res, next) {
    try {
      const token = req.params.token;
      const user = await Usersrvc.getSingleUserByfilter({
        token: token,
      });

      if (!user) {
        throw {
          code: 422,
          message: "Token not found",
          status: "TOKEN_NOT_FOUND",
        };
      }

      const today = Date.now();
      const expiryTime = user.expiryTime;

      if (today > expiryTime) {
        throw {
          code: 422,
          message: "Activation token expired",
          status: "ACTIVATION_TOKEN_EXPIRED",
        };
        j;
      }

      user.status = Status.ACTIVE;
      user.token = null;
      user.expiryTime = null;
      await user.save();

      res.json({
        data: Usersrvc.getPublicProfileOfUser(user),
        message: "Account Created Successfully",
        status: "ACC_ACTIVATED_SUCCESSFULLY",
      });
    } catch (exception) {
      // console.log(exception);
      next(exception);
    }
  }
}

const authctrl = new authController();

module.exports = authctrl;
