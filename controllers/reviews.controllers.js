const {
  fetchReviews,
  fetchReviewById,
  fetchCommentByReview,
  insertComment,
  updatedVote,
} = require("../models/model");

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  fetchReviews(sort_by, order, category)
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

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_vote } = req.body;
  updatedVote(review_id, inc_vote)
    .then((updatedRes) => {
      res.send(updatedRes);
    })
    .catch(next);
};
