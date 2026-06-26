const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/menuController");

// GET all menu items
router.get("/items", getAllItems);

// ADD item
router.post("/items", addItem);

// DELETE item
router.delete("/items/:id", deleteItem);

// UPDATE item
router.put("/items/:id", updateItem);

module.exports = router;
