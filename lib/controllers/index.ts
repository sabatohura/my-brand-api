import {
  listBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
} from "./blog";

import {
  createComment,
  listBlogComments,
  deleteComment,
  listallBlogComments,
  updateComment,
} from "./comment";

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
  updateBlog as changeCommentStatus,
};
