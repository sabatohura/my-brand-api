import { createUser } from "../controllers";
import * as express from "express";

// users auth Route

const UserRoute = express.Router();
UserRoute.route("/register").post(createUser);
export default UserRoute;
