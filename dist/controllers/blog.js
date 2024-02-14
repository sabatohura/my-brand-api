"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.getSingleBlog = exports.deleteBlog = exports.createBlog = exports.listBlog = void 0;
const Blog_1 = require("models/Blog");
const listBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield Blog_1.default.find();
    res.send(blogs);
});
exports.listBlog = listBlog;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new Blog_1.default({
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        likes: [],
    });
    yield blog.save();
    res.send(blog);
});
exports.createBlog = createBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog_1.default.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
});
exports.deleteBlog = deleteBlog;
const getSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findOne({ _id: req.params.id });
        res.send(blog);
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
});
exports.getSingleBlog = getSingleBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findOne({ _id: req.params.id });
        if (req.body.title) {
            blog.title = req.body.title;
        }
        if (req.body.content) {
            blog.content = req.body.content;
        }
        yield blog.save();
        res.send(blog);
    }
    catch (_c) {
        res.status(404);
        res.send({ error: "blog doesn't exist!" });
    }
});
exports.updateBlog = updateBlog;
