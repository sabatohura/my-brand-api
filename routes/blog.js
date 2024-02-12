const express = require("express");
const {
  listBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
} = require("../controllers/blog");
const router = express.Router();
router.route("/").get(listBlog).post(createBlog);
router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
module.exports = router;
