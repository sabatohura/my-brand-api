import * as express from "express";

import {
  blog,
  upSBlog,
  createSBlog,
  deleteSBlog,
  getSBlog,
  listcommentsBlog,
  commentCreate,
} from "../controllers";
import { authenticate, isAdmin } from "../middlewares";
const blogRoute = express.Router();
blogRoute.route("/").get(blog).post(isAdmin, createSBlog);
blogRoute.route("/:id").get(getSBlog).put(upSBlog).delete(deleteSBlog);
blogRoute
  .route("/:id/comments")
  .get(listcommentsBlog)
  .post(authenticate, commentCreate);
export default blogRoute;
