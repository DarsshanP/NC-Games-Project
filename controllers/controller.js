const { fetchCategories, fetchReviews } = require("../models/model");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((review) => {
      res.send(review);
    })
    .catch(next);
};
