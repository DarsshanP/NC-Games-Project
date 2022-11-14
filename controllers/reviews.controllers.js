const { fetchReviews } = require("../models/model");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((review) => {
      res.send(review);
    })
    .catch(next);
};
