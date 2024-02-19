import { createUser, userLogin } from "../controllers";
import * as express from "express";

const UserRoute = express.Router();
UserRoute.route("/register").post(createUser);
UserRoute.route("/login").post(userLogin);
export default UserRoute;
