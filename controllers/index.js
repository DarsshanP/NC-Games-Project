const { getCategories } = require("./categories.controllers");
const { getReviews, getReviewById } = require("./reviews.controllers");

module.exports = { getCategories, getReviews, getReviewById };
