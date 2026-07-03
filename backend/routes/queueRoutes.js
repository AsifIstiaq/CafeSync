const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  generateToken,
  updateStatus,
  updatePaymentStatus,
} = require("../controllers/queueController");

router.get("/orders", getAllOrders);

router.post("/generate-token", generateToken);

router.put("/status", updateStatus);

router.put("/payment-status", updatePaymentStatus);

module.exports = router;
