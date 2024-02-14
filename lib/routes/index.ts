import * as express from "express";

import {
  createBlog,
  deleteBlog,
  getSingleBlog,
  listBlog,
  updateBlog,
} from "controllers/blog";

const router = express.Router();
router.route("/").get(listBlog).post(createBlog);
router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
export default router;
