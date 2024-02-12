const Blog = require("../models/Blog");

const listBlog = async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
    likes: [],
  });
  await blog.save();
  res.send(blog);
};

module.exports = { listBlog, createBlog };
