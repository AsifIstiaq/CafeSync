const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

// GET all inventory items
router.get("/", getAllInventory);

// GET single inventory item
router.get("/:id", getInventoryById);

// ADD inventory item
router.post("/", addInventory);

// UPDATE inventory item
router.put("/:id", updateInventory);

// DELETE inventory item
router.delete("/:id", deleteInventory);

module.exports = router;
