const db = require("../config/db");

// Get all stores with average rating
exports.getStores = (req, res) => {
  const userId = req.query.userId;

  const sql = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      s.owner_id,
      COALESCE(ROUND(AVG(r.rating),1),0) AS rating,
      (
        SELECT rating
        FROM ratings
        WHERE store_id = s.id
          AND user_id = ?
        LIMIT 1
      ) AS userRating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.id DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Create store
exports.createStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const sql = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, address, owner_id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Store created successfully",
    });
  });
};