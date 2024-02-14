"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Blog = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imgUrl: { type: String, required: false },
    likes: { type: Array, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
Blog.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
exports.default = mongoose_1.default.model("blog", Blog);
