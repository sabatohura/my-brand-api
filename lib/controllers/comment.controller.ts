import { Request, Response } from "express";
import { blogComment } from "../models";
import { commentMessageValidate } from "../utils/validations";

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
    res.status(404).send({ error: "Comment could not be removed on blog" });
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
      res.status(200).send(comment);
    } else {
      res.status(400).send({ error: "comment message can not be validated" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Comment on this blog could not be proceeded " });
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
