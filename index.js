const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_URI}/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  const app = express();

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});
