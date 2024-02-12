const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  commentContent: { type: String, required: true },
  blog: { type: mongoose.Schema.ObjectId, ref: "Blog", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("comment", Comment);
