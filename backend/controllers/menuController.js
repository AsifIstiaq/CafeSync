const { getConnection } = require("../config/db");

// GET ALL ITEMS
async function getAllItems(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT * FROM menu_item ORDER BY item_id DESC`,
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

// ADD ITEM
async function addItem(req, res) {
  let conn;

  try {
    const { name, description, price, category, image_url } = req.body;

    conn = await getConnection();

    const itemIdResult = await conn.execute(
      `SELECT NVL(MAX(item_id),0)+1 FROM menu_item`,
    );

    const nextItemId = itemIdResult.rows[0][0];

    await conn.execute(
      `INSERT INTO menu_item
       (item_id, name, description, price, category, image_url)
       VALUES (:item_id, :name, :description, :price, :category, :image_url)`,
      { item_id: nextItemId, name, description, price, category, image_url },
      { autoCommit: true },
    );

    res.json({
      success: true,
      message: "Item added successfully",
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

// DELETE ITEM
async function deleteItem(req, res) {
  let conn;

  try {
    const { id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `DELETE FROM menu_item WHERE item_id = :id`,
      { id },
      { autoCommit: true },
    );

    res.json({
      success: true,
      message: "Item deleted successfully",
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

// UPDATE ITEM
async function updateItem(req, res) {
  let conn;

  try {
    const { id } = req.params;
    const { name, description, price, category, availability, image_url } =
      req.body;

    conn = await getConnection();

    await conn.execute(
      `UPDATE menu_item
       SET name = :name,
           description = :description,
           price = :price,
           category = :category,
           availability = :availability,
           image_url = :image_url
       WHERE item_id = :id`,
      {
        id,
        name,
        description,
        price,
        category,
        availability,
        image_url,
      },
      { autoCommit: true },
    );

    res.json({
      success: true,
      message: "Item updated successfully",
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
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
};
