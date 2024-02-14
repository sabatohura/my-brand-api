import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const User = new mongoose.Schema({
  fullNames: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Please provide an email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password is required"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  registerDate: { type: Date, required: true, default: Date.now },
});

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("user", User);
