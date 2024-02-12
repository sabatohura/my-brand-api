const mongoose = require("mongoose");

const Blog = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imgUrl: { type: String, required: false },
  imgAlt: { type: String, required: false },
  caption: { type: String, required: false },
  likes: { type: Array, required: false },
  comments: { type: Number, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Blog.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Post", Blog);
