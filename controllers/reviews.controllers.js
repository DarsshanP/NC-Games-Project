const {
  fetchReviews,
  fetchReviewById,
  fetchCommentByReview,
} = require("../models/model");

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

exports.getCommentsByReview = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentByReview(review_id)
    .then((comments) => {
      res.send(comments);
    })
    .catch(next);
};
