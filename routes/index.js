const express = require("express");
const router = express.Router();

const baseRouter = router.route("/", (res, req) => {
  res.status(301).redirect("https://sabatohura.github.io/my-brand/");
});


module.exports = baseRouter;
