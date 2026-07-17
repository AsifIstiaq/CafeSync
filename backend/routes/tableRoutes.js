const express = require("express");

const router = express.Router();

const {
  getTables,
  addTable,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");

router.get("/", getTables);

router.post("/", addTable);

router.put("/:id", updateTable);

router.delete("/:id", deleteTable);

module.exports = router;
