const express = require("express");
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");
const { getUserOrders } = require("../controllers/orderController");

router.get("/user/:user_id", getUserOrders);
router.post("/place", placeOrder);

module.exports = router;
