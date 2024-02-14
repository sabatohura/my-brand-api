import dbConnect from "./config/db/index";
import * as express from "express";
import { config } from "dotenv";
import { blogRoute } from "./routes";

config();
dbConnect();

const redirectToHome = (req: express.Request, res: express.Response) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

const app: express.Application = express();
app.listen(process.env.PORT);
app.use(express.json());
app.get(["/", "/api"], redirectToHome);
app.use("/api/blogs", blogRoute);
