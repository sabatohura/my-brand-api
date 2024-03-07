import {
  listBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  likeBlog,
  getUserLikedBlog,
} from "./blog.controller";

import {
  createComment,
  listBlogComments,
  deleteComment,
  listallBlogComments,
  updateComment,
} from "./comment.controller";
import {
  deleteMessage,
  listQueryMessages,
  sendMessage,
  updateMessageStatus,
} from "./message.controller";
import { userLogin, userRegister } from "./user.controller";

export {
  listBlog as blog,
  createBlog as createSBlog,
  deleteBlog as deleteSBlog,
  getSingleBlog as getSBlog,
  updateBlog as upSBlog,
  createComment as commentCreate,
  listBlogComments as listcommentsBlog,
  deleteComment as removeCommentBlog,
  listallBlogComments as listAllComments,
  updateComment as changeCommentStatus,
  userRegister as createUser,
  userLogin,
  deleteMessage,
  listQueryMessages,
  sendMessage,
  updateMessageStatus,
  likeBlog,
  getUserLikedBlog,
};
