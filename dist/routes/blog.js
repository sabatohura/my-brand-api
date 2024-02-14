import express from "express";

const router = express.Router();

router.route("/").get().post(createBlog);
router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
module.exports = router;
