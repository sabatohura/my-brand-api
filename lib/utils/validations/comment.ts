import * as Joi from "joi";
const commentValidate = (comment: { commentContent: string }) => {
  const commentSchema = Joi.object({
    commentContent: Joi.string().min(20).max(500).required(),
  });

  return commentSchema.validate(comment);
};

export default commentValidate;
