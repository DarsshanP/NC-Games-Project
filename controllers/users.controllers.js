const { fetchUsers } = require("../models/model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
