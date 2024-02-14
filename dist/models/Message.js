"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Message = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    createdAt: { type: Date, required: true, default: Date.now },
});
exports.default = mongoose_1.default.model("message", Message);
