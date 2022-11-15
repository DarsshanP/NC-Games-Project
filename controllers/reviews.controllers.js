const {
  fetchReviews,
  fetchReviewById,
  fetchCommentByReview,
  insertComment,
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

exports.postCommentToReview = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;
  insertComment(review_id, body)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
