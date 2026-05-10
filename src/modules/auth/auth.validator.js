const Joi = require("joi");
const { UserRoles } = require("../../config/constant");

const LoginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(25).required(),
});

const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W@-_]).{8,25}$/;

const RegisterDTO = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(password).required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string()
    .regex(/^(customer|seller)$/i)
    .default(UserRoles.CUSTOMER),
  image: Joi.string().allow(null, "").optional().default(null),
});

module.exports = { LoginDTO, RegisterDTO };
