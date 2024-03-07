import { Request, Response } from "express";
import { appUser, blogComment, blogModel } from "../models";
import { commentMessageValidate } from "../utils/validations";

const Comment = blogComment;
const listBlogComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({
      blog: req.params.id,
      status: "Approved",
    });
    const updateComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await appUser.findById(comment.user);
        if (user) {
          return {
            ...comment.toObject(),
            authorName: user.fullNames,
          };
        } else {
          return {
            ...comment.toObject(),
            authorName: "Unknown",
          };
        }
      })
    );

    res.status(200).send({ comments: updateComments });
  } catch {
    res.status(204).send({ message: "blog has no comments" });
  }
};

const listallBlogComments = async (req: Request, res: Response) => {
  const comments = await Comment.find();
  const updateComments = await Promise.all(
    comments.map(async (comment) => {
      const user = await appUser.findById(comment.user);
      const blog = await blogModel.findById(comment.blog);
      if (user && blog) {
        return {
          ...comment.toObject(),
          authorName: user.fullNames,
          blogTitle: blog.title,
        };
      } else {
        return {
          ...comment.toObject(),
          authorName: "Unknown",
          blogTitle: "Unkonown",
        };
      }
    })
  );

  res.status(200).send({ Comments: updateComments });
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    res.status(204).send({ status: "deleted" });
  } catch {
    res.status(400).send({ error: "Comment could not be removed on blog" });
  }
};

const createComment = async (req: Request, res: Response) => {
  try {
    const valid = commentMessageValidate(req.body);
    if (!valid.error) {
      const comment = new Comment({
        commentContent: req.body.commentContent,
        blog: req.params.id,
        user: req.user,
      });
      await comment.save();
      res.status(200).send({ message: "Comment Created", data: comment });
    } else {
      res.status(400).send({
        error: `Please provide valid ${valid.error.details[0].path}`,
      });
    }
  } catch (error) {
    res
      .status(503)
      .send({ error: `Could not comment on this blog please try again later` });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (req.body.status) {
      comment.status = req.body.status;
    }
    await comment.save();
    res
      .status(200)
      .send({ message: "Comment  Status Updated Successfull", data: comment });
  } catch {
    res.status(400).send({ error: "Comment Status can't be updated" });
  }
};

export {
  createComment,
  listBlogComments,
  deleteComment,
  listallBlogComments,
  updateComment,
};
