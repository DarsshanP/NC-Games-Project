const { fetchReviews, fetchReviewById } = require("../models/model");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((review) => {
      res.send(review);
    })
    .catch(next);
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.send(review);
    })
    .catch(next);
};
