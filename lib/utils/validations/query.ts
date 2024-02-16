import * as Joi from "joi";
const queryMessageValidate = (message: {
  name: string;
  password: string;
  email: string;
}) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).max(40).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(20).max(500).required(),
  });

  return registerSchema.validate(message);
};

export default queryMessageValidate;
