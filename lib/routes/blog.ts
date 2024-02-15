import * as express from "express";

import {
  blog,
  upSBlog,
  createSBlog,
  deleteSBlog,
  getSBlog,
} from "../controllers";
const blogRoute = express.Router();
blogRoute.route("/").get(blog).post(createSBlog);
blogRoute.route("/:id").get(getSBlog).put(upSBlog).delete(deleteSBlog);

export default blogRoute;
