const db = require("../db/connection");

exports.checkReviewExists = (review_id) => {
  return db
    .query(
      `
    SELECT * FROM reviews
    WHERE review_id = $1
    `,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Id not found" });
      }
    });
};

exports.checkUsernameExists = (review_id, data) => {
  const { username } = data;
  const dataArr = Object.keys(data);
  const spellCheck = ["username", "body"];
  if (!spellCheck.includes(dataArr[0]) || !spellCheck.includes(dataArr[1])) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `
    SELECT username FROM reviews
    JOIN users ON owner = username
    WHERE review_id = $1
    `,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows[0].username !== username) {
        return Promise.reject({ status: 404, msg: "Username does not exist" });
      }
    });
};

exports.categoryList = () => {
  return db
    .query(
      `
    SELECT slug FROM categories
    `
    )
    .then((results) => {
      return results;
    });
};
