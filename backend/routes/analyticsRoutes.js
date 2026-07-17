const express = require("express");

const router = express.Router();

const {
  salesReport,

  topFoods,

  feedbackAnalytics,
} = require("../controllers/analyticsController");

router.get("/sales", salesReport);

router.get("/top-foods", topFoods);

router.get("/feedback", feedbackAnalytics);

module.exports = router;
