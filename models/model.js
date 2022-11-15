const db = require("../db/connection");

exports.fetchCategories = () => {
  let queryStr = "SELECT * FROM categories";
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.fetchReviews = () => {
  let queryStr = `
    SELECT 
    owner, title, reviews.review_id, category, review_img_url, reviews.created_at, designer, reviews.votes, COUNT(comments.review_id)::INT AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.owner, reviews.title, reviews.review_id, category, review_img_url, reviews.created_at, designer, reviews.votes
    ORDER BY reviews.created_at DESC;
    `;
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.fetchReviewById = (review_id) => {
  let queryStr = `
      SELECT  
      review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at 
      FROM reviews WHERE review_id = $1
      `;

  return db.query(queryStr, [review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Invalid Id" });
    }
    return rows[0];
  });
};
