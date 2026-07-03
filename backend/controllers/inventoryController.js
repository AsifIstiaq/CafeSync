const { getConnection } = require("../config/db");

// GET ALL INVENTORY ITEMS
async function getAllInventory(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT * FROM inventory ORDER BY inventory_id DESC`,
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// GET INVENTORY ITEM BY ID
async function getInventoryById(req, res) {
  let conn;

  try {
    const { id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `SELECT * FROM inventory
       WHERE inventory_id = :id`,
      { id },
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// ADD INVENTORY ITEM
async function addInventory(req, res) {
  let conn;

  try {
    const { ingredient_name, quantity, unit, reorder_level } = req.body;

    conn = await getConnection();

    // Generate next inventory ID
    const idResult = await conn.execute(
      `SELECT NVL(MAX(inventory_id),0)+1 FROM inventory`,
    );

    const nextInventoryId = idResult.rows[0][0];

    await conn.execute(
      `INSERT INTO inventory
      (
        inventory_id,
        ingredient_name,
        quantity,
        unit,
        reorder_level,
        last_updated
      )
      VALUES
      (
        :inventory_id,
        :ingredient_name,
        :quantity,
        :unit,
        :reorder_level,
        SYSDATE
      )`,
      {
        inventory_id: nextInventoryId,
        ingredient_name,
        quantity,
        unit,
        reorder_level,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Inventory item added successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// UPDATE INVENTORY ITEM
async function updateInventory(req, res) {
  let conn;

  try {
    const { id } = req.params;

    const { ingredient_name, quantity, unit, reorder_level } = req.body;

    conn = await getConnection();

    await conn.execute(
      `UPDATE inventory
       SET ingredient_name = :ingredient_name,
           quantity = :quantity,
           unit = :unit,
           reorder_level = :reorder_level,
           last_updated = SYSDATE
       WHERE inventory_id = :id`,
      {
        id,
        ingredient_name,
        quantity,
        unit,
        reorder_level,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Inventory updated successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// DELETE INVENTORY ITEM
async function deleteInventory(req, res) {
  let conn;

  try {
    const { id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `DELETE FROM inventory
       WHERE inventory_id = :id`,
      { id },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Inventory item deleted successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  getAllInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
};
