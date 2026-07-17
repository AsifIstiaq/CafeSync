const express = require("express");

const router = express.Router();

const {
  getUserNotifications,

  markRead,
} = require("../controllers/notificationController");

router.get("/user/:user_id", getUserNotifications);

router.put("/read/:notif_id", markRead);

module.exports = router;
