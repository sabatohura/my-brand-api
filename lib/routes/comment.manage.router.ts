import * as express from "express";

import {
  removeCommentBlog,
  changeCommentStatus,
  listAllComments,
} from "../controllers";
import { isAdmin } from "../middlewares";
const commentRoute = express.Router();
commentRoute.route("/").get(listAllComments);
commentRoute
  .route("/:id")
  .delete(isAdmin, removeCommentBlog)
  .patch(isAdmin, changeCommentStatus);

export default commentRoute;
