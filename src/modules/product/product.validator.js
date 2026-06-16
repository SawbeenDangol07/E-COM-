const Joi = require("joi");
const { Status } = require("../../config/constant");

const ProductDTO = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  //   slug: Joi.string(),
  price: Joi.number().min(1).required(),
  discount: Joi.number().min(0).max(100),
  description: Joi.string().min(10).max(200).required(),
  brand: Joi.string().optional().allow(null, " ").default(null),
  category: Joi.array().items(Joi.string().required()),
  stock: Joi.number().min(0).optional().allow(null, "").default(0),
  sku: Joi.string().optional().allow(null, "").default(null),
  attributes: Joi.array().items(
    Joi.object({
      key: Joi.string().optional().allow(null, "").default(0),
      value: Joi.array().items(Joi.string()),
    })
      .optional()
      .allow(null, "")
      .default(null),
  ),
  seller: Joi.string().optional().allow(null, " ").default(null),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  images: Joi.string().optional().allow(null, "").default(null),
});

module.exports = ProductDTO;
