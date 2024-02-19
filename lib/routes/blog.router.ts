import * as express from "express";

import {
  blog,
  upSBlog,
  createSBlog,
  deleteSBlog,
  getSBlog,
} from "../controllers";
import { isAdmin } from "../middlewares";
const blogRoute = express.Router();
blogRoute.route("/").get(blog).post(isAdmin, createSBlog);
blogRoute.route("/:id").get(getSBlog).put(upSBlog).delete(deleteSBlog);

export default blogRoute;
