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
    owner, title, reviews.review_id, category, review_img_url, reviews.created_at, designer, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.owner, reviews.title, reviews.review_id, category, review_img_url, reviews.created_at, designer, reviews.votes
    ORDER BY reviews.created_at DESC;
    `;
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
