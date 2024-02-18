import { Request, Response } from "express";
import { blogModel } from "../models";
import { createBlogValidate } from "../utils/validations";

const Blog = blogModel;
const listBlog = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

const createBlog = async (req: Request, res: Response) => {
  try {
    const valid = createBlogValidate(req.body);
    if (!valid.error) {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        likes: [],
      });
      await blog.save();
      res.status(200).send(blog);
    } else {
      res.status(400).send({ error: "Blog content could not be validated" });
    }
  } catch {
    res.status(400).send({ error: "Could not create a blog" });
  }
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

    if (req.body.likes) {
      blog.likes = [...new Set([...blog.likes, req.body.likes])];
    }

    await blog.save();
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "blog doesn't exist!" });
  }
};

export { listBlog, createBlog, deleteBlog, getSingleBlog, updateBlog };
