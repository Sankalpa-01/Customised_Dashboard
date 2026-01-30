const express = require("express");
const router = express.Router();
const {
  getDashboard,
  saveDashboard,
} = require("../controllers/dashboardController");

router.get("/", getDashboard);
router.post("/", saveDashboard);

module.exports = router;
