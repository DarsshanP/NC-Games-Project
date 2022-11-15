const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReview,
} = require("./controllers/index");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReview);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
