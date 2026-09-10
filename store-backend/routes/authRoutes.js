const express = require("express");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");
const { changePassword } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.put("/change-password", changePassword);

module.exports = router;