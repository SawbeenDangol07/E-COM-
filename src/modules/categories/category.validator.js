const joi = require("joi");
const { Status } = require("../../config/constant");

const CategoryDTO = joi.object({
  name: joi.string().min(2).max(100).required(),
  parentId: joi.string().optional().allow(null, "").default(null),
  brandId: joi
    .array()
    .items(joi.string().optional().allow(null, "").default(null)),
  status: joi.string().allow("active", "inactive").default(Status.INACTIVE),
  image: joi.string().allow(null, "").optional().default(null),
});

module.exports = CategoryDTO;
