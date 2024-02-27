import dbConnect from "./config/db/index";
import * as express from "express";
import { config } from "dotenv";
import { commentRoute, messageRoute, routeBlog, routeUser } from "./routes";
import * as session from "express-session";
import passport from "./config/passport";
import * as bodyParser from "body-parser";
import * as swaggerUiExpress from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

config();
dbConnect();

const redirectToHome = (req: express.Request, res: express.Response) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

export const app: express.Application = express();

const swaggerUI = swaggerUiExpress;

app.listen(process.env.PORT);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get(["/", "/api"], redirectToHome);

app.use("/api/blogs", routeBlog);
app.use("/api/user", routeUser);
app.use("/api/comments", commentRoute);
app.use("/api/message", messageRoute);
