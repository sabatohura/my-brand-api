import * as Joi from "joi";
const queryMessageValidate = (message: {
  senderName: string;
  senderEmail: string;
  message: string;
}) => {
  const messageSchema = Joi.object({
    senderName: Joi.string().min(6).max(40).required(),
    senderEmail: Joi.string().email().required(),
    message: Joi.string().min(20).max(500).required(),
  });

  return messageSchema.validate(message);
};

export default queryMessageValidate;
