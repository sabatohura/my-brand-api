import * as Joi from "joi";

const validateLogin = (login: { email: string; password: string }) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};

const userRegisterValidate = (userData: {
  name: string;
  password: string;
  email: string;
}) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return registerSchema.validate(userData);
};
export { validateLogin, userRegisterValidate };
