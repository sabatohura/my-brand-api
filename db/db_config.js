const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_URI}/?retryWrites=true&w=majority`;
const dbConnect = async () => {
  mongoose
    .connect(uri)
    .then()
    .catch((err) => {
      console.error(err);
    });
};
module.exports = dbConnect;
