const { fetchUsers, removeComment } = require("../models/model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
