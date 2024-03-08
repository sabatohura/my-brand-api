import { isAdmin } from "../middlewares";
import { createUser, getUsers, userLogin } from "../controllers";
import * as express from "express";

const UserRoute = express.Router();
UserRoute.route("/register").post(createUser);
UserRoute.route("/login").post(userLogin);
UserRoute.route("/").get(isAdmin, getUsers);
export default UserRoute;
