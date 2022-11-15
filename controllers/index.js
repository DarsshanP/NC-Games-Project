const { getCategories } = require("./categories.controllers");
const {
  getReviews,
  getReviewById,
  getCommentsByReview,
  postCommentToReview,
} = require("./reviews.controllers");

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReview,
  postCommentToReview,
};
