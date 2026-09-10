const express = require("express");
const router = express.Router();

const {
  getStores,
  createStore,
} = require("../controllers/storeController");

router.get("/", getStores);
router.post("/", createStore);

module.exports = router;