import * as Joi from "joi";
const blogValidate = (blog: {
  title: string;
  content: string;
  imgUrl: string;
}) => {
  const blogSchema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    content: Joi.string().min(20).max(1000).required(),
    imgUrl: Joi.string().min(20).max(100).required(),
  });

  return blogSchema.validate(blog);
};

export default blogValidate;
