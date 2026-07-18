const { getConnection } = require("../config/db");

// CREATE PAYMENT SESSION

async function createPayment(req, res) {
  let conn;

  try {
    const { order_id } = req.params;

    conn = await getConnection();

    // Get order
    const orderResult = await conn.execute(
      `
      SELECT
        order_id,
        total_amount
      FROM order_table
      WHERE order_id = :id
      `,
      {
        id: order_id,
      },
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = orderResult.rows[0];

    // Check if payment already exists
    const existingPayment = await conn.execute(
      `
      SELECT payment_id
      FROM payment
      WHERE order_id = :order_id
      `,
      {
        order_id,
      },
    );

    if (existingPayment.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this order.",
      });
    }

    // Generate payment id
    const idResult = await conn.execute(`
      SELECT NVL(MAX(payment_id),0)+1
      FROM payment
    `);

    const payment_id = idResult.rows[0][0];

    // Insert payment
    await conn.execute(
      `
      INSERT INTO payment
      (
        payment_id,
        order_id,
        method,
        amount,
        status,
        paid_at
      )
      VALUES
      (
        :payment_id,
        :order_id,
        'Offline',
        :amount,
        'Paid',
        SYSTIMESTAMP
      )
      `,
      {
        payment_id,
        order_id,
        amount: order[1],
      },
    );

    // Update order
    await conn.execute(
      `
      UPDATE order_table
      SET payment_status='Paid'
      WHERE order_id=:order_id
      `,
      {
        order_id,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Payment completed successfully.",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  createPayment,
};
