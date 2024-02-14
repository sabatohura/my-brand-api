"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Comment = new mongoose_1.default.Schema({
    commentContent: { type: String, required: true },
    blog: { type: mongoose_1.default.Schema.ObjectId, ref: "blog", required: true },
    user: { type: mongoose_1.default.Schema.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});
exports.default = mongoose_1.default.model("comment", Comment);
