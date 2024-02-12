const express = require("express");
const { listBlog, createBlog } = require("../controllers/blog");
const router = express.Router();
router.route("/").get(listBlog).post(createBlog);
module.exports = router;
