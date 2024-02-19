import { isAdmin } from "../middlewares";
import {
  listAllComments,
  commentCreate,
  listcommentsBlog,
  removeCommentBlog,
  changeCommentStatus,
} from "../controllers";

import * as express from "express";

const commentRoute = express.Router();
commentRoute.route("/:id").get(listcommentsBlog).post(commentCreate);
commentRoute.route("/").get(listAllComments);
commentRoute
  .route("/manage/:id")
  .delete(isAdmin, removeCommentBlog)
  .put(isAdmin, changeCommentStatus);
export default commentRoute;
