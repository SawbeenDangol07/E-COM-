const jwt = require("jsonwebtoken");
const { AppConfig } = require("../config/app.config");
const userService = require("../modules/users/user.service");
const { UserRoles } = require("../config/constant");

const checkLogin = (role = null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"] ?? null;
      if (!token) {
        next({
          code: 401,
          message: "Missing access token",
          status: "MISSING_ACCESS_TOKEN_ERR",
        });
      }

      token = token.replace("Bearer ", "");

      const data = jwt.verify(token, AppConfig.jwtSecret);

      const userDetail = await userService.getSingleUserByfilter({
        _id: data.sub,
      });
      if (!userDetail) {
        next({
          code: 403,
          message: "User does not exists any more",
          status: "USER_ALREADY_DELETED",
        });
      }

      //loggedin
      req.loggedInUser = userService.getPublicProfileOfUser(userDetail);

      // admin perm
      if (
        userDetail.role === UserRoles.ADMIN ||
        role === null ||
        (Array.isArray(role) && role.includes(userDetail.role))
      ) {
        // no check
        next();
      } else {
        next({
          code: 403,
          message: "User Access Denied",
          status: "UNAUTHORIZED_ACCESS",
        });
      }
    } catch (exception) {
      let errorBag = {
        code: 401,
        message: exception.message,
        status: "AUTH_ERR",
      };
      next(errorBag);
    }
  };
};

module.exports = checkLogin;
