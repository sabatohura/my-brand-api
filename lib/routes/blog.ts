import * as express from "express";

import {
  blog,
  upSBlog,
  createSBlog,
  deleteSBlog,
  getSBlog,
  listAllComments,
  commentCreate,
  listcommentsBlog,
  removeCommentBlog,
} from "../controllers";
const blogRoute = express.Router();
blogRoute.route("/").get(blog).post(createSBlog);
blogRoute.route("/:id").get(getSBlog).put(upSBlog).delete(deleteSBlog);
blogRoute.route("/comment/:id").get(listcommentsBlog).post(commentCreate);
blogRoute.route("/comments-all").get(listAllComments);
blogRoute.route("/comments-all/:id").delete(removeCommentBlog);

export default blogRoute;
