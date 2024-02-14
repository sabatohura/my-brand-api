import { Request, Response } from "express";
import { blogModel } from "./../models";

const Blog = blogModel;
const listBlog = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

const createBlog = async (req: Request, res: Response) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
    likes: [],
  });
  await blog.save();
  res.send(blog);
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    await blog.save();
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "blog doesn't exist!" });
  }
};

export { listBlog, createBlog, deleteBlog, getSingleBlog, updateBlog };
