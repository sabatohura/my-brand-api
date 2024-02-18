import dbConnect from "./config/db/index";
import * as express from "express";
import { config } from "dotenv";
import { messageRoute, routeBlog, routeComment, routeUser } from "./routes";
import * as session from "express-session";
import * as passport from "passport";
// import { PassportConfig } from "utils/auth/passport";

config();
dbConnect();

const redirectToHome = (req: express.Request, res: express.Response) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

const app: express.Application = express();

app.listen(process.env.PORT);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// PassportConfig();

app.get(["/", "/api"], redirectToHome);
app.use("/api/blogs", routeBlog);
app.use("/api/comments", routeComment);
app.use("/api/user", routeUser);
app.use("/api/message", messageRoute);
