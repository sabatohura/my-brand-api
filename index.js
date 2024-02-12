const dbConnect = require("./db/db_config");
const express = require("express");
require("dotenv").config();
dbConnect();

const redirectToHome = (req, res) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
};

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.listen(port);

app.get("/", redirectToHome);
app.get("/api", redirectToHome);
