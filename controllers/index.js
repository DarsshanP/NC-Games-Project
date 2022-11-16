const { getCategories } = require("./categories.controllers");
const {
  getReviews,
  getReviewById,
  getCommentsByReview,
  postCommentToReview,
  patchReviewById,
} = require("./reviews.controllers");

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReview,
  postCommentToReview,
  patchReviewById,
};
