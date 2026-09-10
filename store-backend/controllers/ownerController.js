const db = require("../config/db");

const getDashboard = (req, res) => {
  const ownerId = req.params.ownerId;

  const sql = `
    SELECT
      s.id,
      s.name,
      COALESCE(ROUND(AVG(r.rating),1),0) AS averageRating,
      COUNT(r.id) AS totalReviews
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `;

  db.query(sql, [ownerId], (err, summary) => {
    if (err) return res.status(500).json(err);

    const reviewSql = `
      SELECT
        u.name,
        u.email,
        r.rating
      FROM ratings r
      JOIN users u
        ON r.user_id = u.id
      JOIN stores s
        ON r.store_id = s.id
      WHERE s.owner_id = ?
    `;

    db.query(reviewSql, [ownerId], (err, reviews) => {
      if (err) return res.status(500).json(err);

      res.json({
        summary,
        reviews,
      });
    });
  });
};

module.exports = { getDashboard };