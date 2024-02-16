import Joi from "joi";

const validateLogin = (login) => {
  const loginSchema = Joi.object({
    email: Joi.String,
  });
};
