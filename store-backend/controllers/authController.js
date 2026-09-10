const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!name || !email || !address || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?,?)",
        [name, email, address, hashedPassword, role],
        (err) => {
          if (err) return res.status(500).json(err);

          res.status(201).json({
            message: "Account created successfully",
          });
        }
      );
    }
  );
};
// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const validPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};
const changePassword = (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  const sql = "SELECT * FROM users WHERE id=?";

  db.query(sql, [userId], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const valid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    db.query(
      "UPDATE users SET password=? WHERE id=?",
      [hashed, userId],
      (err2) => {
        if (err2) return res.status(500).json(err2);

        res.json({
          success: true,
          message: "Password updated successfully",
        });
      }
    );
  });
};
module.exports = { signup, login , changePassword};