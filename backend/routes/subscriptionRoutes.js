const express = require("express");

const router = express.Router();

const {
  getPlans,

  createSubscription,

  getUserSubscriptions,

  cancelSubscription,

  getAllSubscriptions,

  updateSubscriptionStatus,
} = require("../controllers/subscriptionController");

// CUSTOMER

router.get("/plans", getPlans);

router.post("/create", createSubscription);

router.get("/user/:user_id", getUserSubscriptions);

router.put("/cancel/:sub_id", cancelSubscription);

// ADMIN

router.get("/admin/all", getAllSubscriptions);

router.put("/admin/status/:sub_id", updateSubscriptionStatus);

module.exports = router;
