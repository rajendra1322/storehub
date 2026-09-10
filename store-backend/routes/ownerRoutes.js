const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/ownerController");

router.get("/:ownerId", getDashboard);

module.exports = router;