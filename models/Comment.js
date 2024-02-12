const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  commentContent: { type: String, required: true },
  blog: { type: mongoose.Schema.ObjectId, ref: "blog", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("comment", Comment);
