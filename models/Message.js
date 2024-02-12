const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  message: { type: String, required: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("message", Message);
