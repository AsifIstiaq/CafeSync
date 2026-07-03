const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  generateToken,
  updateStatus,
} = require("../controllers/queueController");

router.get("/orders", getAllOrders);

router.post("/generate-token", generateToken);

router.put("/status", updateStatus);

module.exports = router;
