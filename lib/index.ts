import dbConnect from "./config/db/index";
import * as express from "express";
import { config } from "dotenv";
import router from "routes";

config();
dbConnect();
const port = process.env.PORT;
const redirectToHome = (req: express.Request, res: express.Response) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

console.log(port);
const app: express.Application = express();
app.listen(port);
app.use(express.json());

app.get("/", redirectToHome);
app.get("/api", redirectToHome);

app.use("/api/blogs", router);
