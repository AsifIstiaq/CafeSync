const { getConnection } = require("../config/db");

// PLACE ORDER
async function placeOrder(req, res) {
  let conn;

  try {
    const { user_id, items, total_amount } = req.body;

    conn = await getConnection();

    // CREATE ORDER
    const orderIdResult = await conn.execute(
      `SELECT NVL(MAX(order_id),0)+1 FROM order_table`,
    );

    const orderId = orderIdResult.rows[0][0];

    await conn.execute(
      `INSERT INTO order_table
      (order_id, user_id, status, total_amount, payment_status, created_at)
      VALUES (:order_id, :user_id, 'Pending', :total_amount, 'Unpaid', SYSDATE)`,
      { order_id: orderId, user_id, total_amount },
      { autoCommit: true },
    );

    // INSERT ORDER ITEMS
    for (let item of items) {
      const itemId = item[0];
      const qty = item[2];
      const price = item[3];

      const orderItemIdResult = await conn.execute(
        `SELECT NVL(MAX(order_item_id),0)+1 FROM order_item`,
      );

      const orderItemId = orderItemIdResult.rows[0][0];

      await conn.execute(
        `INSERT INTO order_item
        (order_item_id, order_id, item_id, quantity, unit_price)
        VALUES (:id, :order_id, :item_id, :qty, :price)`,
        {
          id: orderItemId,
          order_id: orderId,
          item_id: itemId,
          qty,
          price,
        },
        { autoCommit: true },
      );
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order_id: orderId,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

async function getUserOrders(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `SELECT 
          o.order_id,
          o.status,
          o.total_amount,
          o.payment_status,
          q.token_number,
          m.name,
          oi.quantity
       FROM order_table o
       LEFT JOIN queue_token q 
         ON o.order_id = q.order_id
       LEFT JOIN order_item oi
         ON o.order_id = oi.order_id
       LEFT JOIN menu_item m
         ON oi.item_id = m.item_id
       WHERE o.user_id = :user_id
       ORDER BY o.order_id DESC`,
      { user_id },
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

module.exports = { getUserOrders, placeOrder };
