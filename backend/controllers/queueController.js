const { getConnection } = require("../config/db");

// GET ALL ORDERS (ADMIN)
async function getAllOrders(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT order_id, user_id, status, total_amount, payment_status, created_at
       FROM order_table
       ORDER BY order_id DESC`,
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

// GENERATE QUEUE TOKEN (FIXED)
async function generateToken(req, res) {
  let conn;

  try {
    const { order_id } = req.body;

    conn = await getConnection();

    // get next token number
    const tokenResult = await conn.execute(
      `SELECT NVL(MAX(token_number),0) + 1 AS next_token FROM queue_token`,
    );

    const token_number = tokenResult.rows[0][0];

    // get next token_id
    const idResult = await conn.execute(
      `SELECT NVL(MAX(token_id),0) + 1 FROM queue_token`,
    );

    const token_id = idResult.rows[0][0];

    // insert token
    await conn.execute(
      `INSERT INTO queue_token
       (token_id, order_id, token_number, status, issued_at)
       VALUES (:token_id, :order_id, :token_number, 'waiting', CURRENT_TIMESTAMP)`,
      {
        token_id,
        order_id,
        token_number,
      },
      { autoCommit: true },
    );

    // update order status
    await conn.execute(
      `UPDATE order_table
       SET status = 'preparing'
       WHERE order_id = :order_id`,
      { order_id },
      { autoCommit: true },
    );

    res.json({
      success: true,
      message: "Token generated successfully",
      token_number,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

// UPDATE ORDER STATUS (FIXED FLOW)
async function updateStatus(req, res) {
  let conn;

  try {
    const { order_id, status } = req.body;

    conn = await getConnection();

    await conn.execute(
      `UPDATE order_table
       SET status = :status
       WHERE order_id = :order_id`,
      { status, order_id },
      { autoCommit: true },
    );

    // if served → update queue_token
    if (status === "served") {
      await conn.execute(
        `UPDATE queue_token
         SET status = 'served',
             served_at = CURRENT_TIMESTAMP
         WHERE order_id = :order_id`,
        { order_id },
        { autoCommit: true },
      );
    }

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  getAllOrders,
  generateToken,
  updateStatus,
};
