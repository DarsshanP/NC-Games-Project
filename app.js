const express = require("express");
const { getCategories, getReviews } = require("./controllers/controller");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
