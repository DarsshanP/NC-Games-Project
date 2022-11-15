const { getCategories } = require("./categories.controllers");
const {
  getReviews,
  getReviewById,
  getCommentsByReview,
} = require("./reviews.controllers");

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReview,
};
