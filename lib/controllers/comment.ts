import { Request, Response } from "express";
import { blogComment } from "./../models";

const Comment = blogComment;

const listBlogComments = async (req: Request, res: Response) => {
  const comments = await Comment.find({
    blog: req.params.id,
    status: "Approved",
  });
  res.send(comments);
};
const listallBlogComments = async (req: Request, res: Response) => {
  const comments = await Comment.find();
  res.send(comments);
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    res.status(204).send({ status: "deleted" });
  } catch {
    res.status(404);
    res.send({ error: "Comment couldnot be removed on blog" });
  }
};

const createComment = async (req: Request, res: Response) => {
  try {
    const comment = new Comment({
      commentContent: req.body.content,
      blog: req.params.id,
      user: req.query.userId,
    });
    await comment.save();
    res.send(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (req.body.status) {
      comment.status = req.body.status;
    }
    await comment.save();
    res.send(comment);
  } catch {
    res.status(404).send({ error: "Comment can't be updated" });
  }
};

export {
  createComment,
  listBlogComments,
  deleteComment,
  listallBlogComments,
  updateComment,
};
