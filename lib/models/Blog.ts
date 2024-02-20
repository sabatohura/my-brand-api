import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imgUrl: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Blog.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("blog", Blog);
