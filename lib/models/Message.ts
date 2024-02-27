import mongoose from "mongoose";

const Message = new mongoose.Schema({
  message: { type: String, required: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("message", Message);
