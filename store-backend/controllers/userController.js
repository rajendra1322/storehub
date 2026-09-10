const bcrypt = require("bcrypt");
const db = require("../config/db");

// Get all users
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, address, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Create new user
exports.createUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, address, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, address, hashedPassword, role],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Email already exists",
          });
        }

        res.json({
          success: true,
          message: "User created successfully",
        });
      }
    );
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};