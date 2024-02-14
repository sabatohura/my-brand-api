import mongoose from "mongoose";

const Comment = new mongoose.Schema({
  commentContent: { type: String, required: true },
  blog: { type: mongoose.Schema.ObjectId, ref: "blog", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("comment", Comment);
