const joi = require("joi");
const { Status } = require("../../config/constant");

const BrandDTO = joi.object({
  name: joi.string().min(2).max(100).required(),
  status: joi.string().allow("active", "inactive").default(Status.INACTIVE),
  logo: joi.string().allow(null, "").optional().default(null),
});

module.exports = BrandDTO;
