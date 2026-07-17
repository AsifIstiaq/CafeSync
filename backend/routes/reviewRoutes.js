const express = require("express");

const router = express.Router();

const {
  addReview,
  getItemReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Add review

router.post("/add", addReview);

// Get reviews of food

router.get("/item/:item_id", getItemReviews);

// Delete review

router.delete("/:review_id", deleteReview);

module.exports = router;
