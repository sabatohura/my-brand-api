import * as Joi from "joi";
const queryMessageValidate = (message: {
  name: string;
  email: string;
  message: string;
}) => {
  const messageSchema = Joi.object({
    name: Joi.string().min(6).max(40).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(20).max(500).required(),
  });

  return messageSchema.validate(message);
};

export default queryMessageValidate;
