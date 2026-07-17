const express = require("express");

const router = express.Router();

const {
  addFeedback,

  getAllFeedback,

  updateFeedbackStatus,
} = require("../controllers/feedbackController");

// CUSTOMER

router.post("/add", addFeedback);

// ADMIN

router.get("/admin/all", getAllFeedback);

router.put("/admin/status/:feedback_id", updateFeedbackStatus);

module.exports = router;
