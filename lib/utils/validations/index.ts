import { validateLogin, userRegisterValidate } from "./user";
import blogValidate from "./blog";
import commentValidate from "./comment";
import queryMessageValidate from "./message";

export {
  validateLogin as loginValidate,
  userRegisterValidate as registerValidate,
  blogValidate as createBlogValidate,
  commentValidate as commentMessageValidate,
  queryMessageValidate as contactMessageValidate,
};
