import { isAdmin } from "../middlewares";
import {
  deleteMessage,
  listQueryMessages,
  sendMessage,
  updateMessageStatus,
} from "../controllers";
import * as express from "express";

const messageRoute = express.Router();
messageRoute.route("/").post(sendMessage).get(isAdmin, listQueryMessages);
messageRoute
  .route("/:id")
  .patch(isAdmin, updateMessageStatus)
  .delete(isAdmin, deleteMessage);
export default messageRoute;
