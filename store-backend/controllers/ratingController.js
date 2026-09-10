const db = require("../config/db");

const addRating = (req, res) => {
  const { user_id, store_id, rating } = req.body;

  db.query(
    "SELECT * FROM ratings WHERE user_id=? AND store_id=?",
    [user_id, store_id],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?",
          [rating, user_id, store_id],
          () => res.json({ message: "Rating Updated" })
        );
      } else {
        db.query(
          "INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?)",
          [user_id, store_id, rating],
          () => res.json({ message: "Rating Added" })
        );
      }
    }
  );
};

module.exports = { addRating };