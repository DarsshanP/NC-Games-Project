const { fetchCategories } = require("../models/model");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
};
