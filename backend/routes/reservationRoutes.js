const express = require("express");

const router = express.Router();

const {
  getTables,
  reserveTable,
  myReservations,
  getAllReservations,
  updateReservationStatus,
} = require("../controllers/reservationController");

router.get("/tables", getTables);

router.post("/reserve", reserveTable);

router.get("/my/:user_id", myReservations);

router.get("/admin", getAllReservations);

router.put("/status", updateReservationStatus);

router.get("/admin", getAllReservations);

router.put("/status", updateReservationStatus);

module.exports = router;
