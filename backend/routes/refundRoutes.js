const express = require("express");

const router = express.Router();

const {
  requestRefund,

  getAllRefunds,

  updateRefund,
} = require("../controllers/refundController");

// CUSTOMER

router.post("/request", requestRefund);

// ADMIN

router.get("/admin/all", getAllRefunds);

router.put("/admin/update/:refund_id", updateRefund);

module.exports = router;
