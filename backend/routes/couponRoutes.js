const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require("../controllers/couponController");

// CREATE
router.post("/create", createCoupon);

// READ
router.get("/", getCoupons);

// UPDATE
router.put("/:coupon_id", updateCoupon);

// DELETE
router.delete("/:coupon_id", deleteCoupon);

router.post("/validate", validateCoupon);

module.exports = router;
