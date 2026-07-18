const express = require("express");

const router = express.Router();

const { createPayment } = require("../controllers/paymentController");

router.post("/create/:order_id", createPayment);

module.exports = router;
