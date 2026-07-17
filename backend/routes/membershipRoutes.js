const express = require("express");

const router = express.Router();

const {
  getUserMembership,

  getAllMembership,

  createMembership,

  updateMembership,

  deleteMembership,
} = require("../controllers/membershipController");

// CUSTOMER

router.get("/user/:user_id", getUserMembership);

// ADMIN

router.get("/admin/all", getAllMembership);

router.post("/admin/create", createMembership);

router.put("/admin/update/:card_id", updateMembership);

router.delete("/admin/delete/:card_id", deleteMembership);

module.exports = router;
