import { Request, Response, NextFunction } from "express";
import { Like, blogModel } from "../models";
import { createBlogValidate } from "../utils/validations";
import uploadImage from "../config/cloudinary";
import upload from "../config/multer";
import * as path from "path";

const Blog = blogModel;
const createBlog = async (req: any, res: Response) => {
  try {
    const uploadedImage = await uploadImage(req.file.buffer);

    const blogInstance = {
      title: req.body.title,
      content: req.body.content,
      imgUrl: uploadedImage,
    };

    const valid = createBlogValidate(blogInstance);

    if (!valid.error) {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        imgUrl: uploadedImage,
      });
      await blog.save();

      res.status(200).send({ message: "blog created", data: blog });
    } else {
      res.status(400).send({
        error: `Blog content could not be validated`,
      });
    }
  } catch (error) {
    res.status(400).send({ error: `Could not create a blog due to` });
  }
};

const listBlog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    const updatedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const blogLikes = await Like.countDocuments({ blog: blog._id });
        return {
          ...blog.toObject(),
          likes: blogLikes,
        };
      })
    );
    res.status(200).send(updatedBlogs);
  } catch (error) {
    res.status(400).send({
      error:
        "there is an issue with get blogs, please check your internet and try again",
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(400).send({ error: "There is a problem with deleting a blog" });
  }
};

const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.status(200).send(blog);
  } catch {
    res.status(404).send({ error: "Blog doesn't exist!" });
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
    res.status(200).send(blog);
  } catch {
    res.status(404);
    res.send({ error: "blog doesn't exist!" });
  }
};

const likeBlog = async (req: Request, res: Response) => {
  try {
    const like = await Like.findOne({
      blog: req.params.id,
      user: req.user,
    });
    if (like) {
      await Like.deleteOne({ blog: req.params.id, user: req.user });
      res.status(200).send({ message: "blog unliked" });
    } else {
      const newLike = new Like({ blog: req.params.id, user: req.user });
      await newLike.save();
      res.status(200).send({ message: "blog liked" });
    }
  } catch (error) {
    res
      .status(404)
      .send({ error: `Comment couldnot be removed on blog due to ${error}` });
  }
};

export {
  listBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  likeBlog,
};
