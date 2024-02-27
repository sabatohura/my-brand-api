import * as express from "express";

import {
  blog,
  upSBlog,
  createSBlog,
  deleteSBlog,
  getSBlog,
  listcommentsBlog,
  commentCreate,
  likeBlog,
} from "../controllers";
import { authenticate, isAdmin } from "../middlewares";
import upload from "../config/multer";
const blogRoute = express.Router();
blogRoute
  .route("/")
  .get(blog)
  .post(isAdmin, upload.single("imgUrl"), createSBlog);
blogRoute.route("/:id").get(getSBlog).put(upSBlog).delete(deleteSBlog);
blogRoute.route("/:id/like").get(authenticate, likeBlog);
blogRoute
  .route("/:id/comments")
  .get(listcommentsBlog)
  .post(authenticate, commentCreate);
export default blogRoute;
