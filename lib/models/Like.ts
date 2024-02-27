import mongoose, { Document, Schema } from "mongoose";

interface Like extends Document {
  blog: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const likeSchema = new Schema<Like>({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<Like>("Like", likeSchema);
