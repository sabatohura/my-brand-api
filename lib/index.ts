import * as express from "express";
import { commentRoute, messageRoute, routeBlog, routeUser } from "./routes";
import * as session from "express-session";
import passport from "./config/passport";
import * as bodyParser from "body-parser";
import * as swaggerUiExpress from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";
import * as cors from "cors";
import { config } from "dotenv";
config();

const redirectToHome = (req: express.Request, res: express.Response) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

const app: express.Application = express();

const swaggerUI = swaggerUiExpress;

app.use(cors());

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
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.get(["/", "/api"], redirectToHome);
app.use("/api/blogs", routeBlog);
app.use("/api/user", routeUser);
app.use("/api/comments", commentRoute);
app.use("/api/message", messageRoute);
export default app;
