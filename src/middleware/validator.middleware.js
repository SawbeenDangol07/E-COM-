const Joi = require("joi");

const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      if (!data) {
        throw {
          code: 422,
          message: "DATA_REQUIRED",
          status: "EMPTY_PAYLOAD_ERR",
        };
      }

      let result = await schema.validateAsync(data, { abortEarly: false });
      req.body = result;
      next();
    } catch (exception) {
      let msgbag = {};

      if (exception instanceof Joi.ValidationError) {
        exception.details.map((error) => {
          msgbag[error.path.pop()] = error.message;
        });
      }
      next({
        code: 400,
        message: "VALIDATION_FAILED",
        status: "VALIDATION_ERR",
        detail: msgbag,
      });
    }
  };
};

module.exports = bodyValidator;
