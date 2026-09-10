const bcrypt = require("bcrypt");
const db = require("./db");

const createDefaultAdmin = async () => {
  const email = "admin@storehub.com";

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log("Admin check failed:", err);
        return;
      }

      if (result.length === 0) {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const sql = `
          INSERT INTO users
          (name, email, address, password, role)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
          sql,
          [
            "System Admin",
            email,
            "Head Office",
            hashedPassword,
            "Admin",
          ],
          (err2) => {
            if (err2) {
              console.log("Admin creation failed:", err2);
            } else {
              console.log("Default Admin Created");
            }
          }
        );
      } else {
        console.log("Default Admin Already Exists");
      }
    }
  );
};

module.exports = createDefaultAdmin;