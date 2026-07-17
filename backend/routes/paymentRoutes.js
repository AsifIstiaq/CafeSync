const express = require("express");

const router = express.Router();

const {
  createPayment,

  paymentSuccess,

  paymentFail,

  paymentCancel,

  paymentIPN,
} = require("../controllers/paymentController");

router.post("/create/:order_id", createPayment);

router.post("/success", paymentSuccess);

router.post("/fail", paymentFail);

router.post("/cancel", paymentCancel);

router.post("/ipn", paymentIPN);

module.exports = router;
