import mongoose, { Document, Schema } from "mongoose";

interface Comment extends Document {
  commentContent: string;
  blog: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  status: "Approved" | "Pending" | "Rejected";
  createdAt: Date;
}

const commentSchema = new Schema<Comment>({
  commentContent: { type: String, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<Comment>("Comment", commentSchema);
