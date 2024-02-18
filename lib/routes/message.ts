import {
  deleteMessage,
  listQueryMessages,
  sendMessage,
  updateMessageStatus,
} from "./../controllers";
import * as express from "express";

// query messages route

const messageRoute = express.Router();
messageRoute.route("/").post(sendMessage).get(listQueryMessages);
messageRoute.route("/:id").patch(updateMessageStatus).delete(deleteMessage);
export default messageRoute;
