const { getCategories } = require("./categories.controllers");
const { getUsers, deleteCommentById } = require("./users.controllers");
const { getEndpointList } = require("./apiController");
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
  getUsers,
  deleteCommentById,
  getEndpointList,
};
