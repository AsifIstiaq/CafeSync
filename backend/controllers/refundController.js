const { getConnection } = require("../config/db");

// CUSTOMER REQUEST REFUND / CANCEL ORDER
async function requestRefund(req, res) {
  let conn;

  try {
    const { user_id, order_id, amount, reason } = req.body;

    conn = await getConnection();

    // CHECK ORDER STATUS

    const orderCheck = await conn.execute(
      `
      SELECT status
      FROM order_table
      WHERE order_id=:order_id
      AND user_id=:user_id
      `,
      {
        order_id,
        user_id,
      },
    );

    if (orderCheck.rows.length === 0) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    const status = orderCheck.rows[0][0];

    if (
      status.toLowerCase() !== "pending" &&
      status.toLowerCase() !== "received"
    ) {
      return res.json({
        success: false,
        message: "Order cannot be cancelled now",
      });
    }

    // UPDATE ORDER STATUS

    await conn.execute(
      `
      UPDATE order_table
      SET status='Cancelled'
      WHERE order_id=:order_id
      `,
      {
        order_id,
      },
    );

    // CREATE REFUND ID

    const refundIdResult = await conn.execute(
      `
      SELECT NVL(MAX(refund_id),0)+1
      FROM refunds
      `,
    );

    const refund_id = refundIdResult.rows[0][0];

    // INSERT REFUND

    await conn.execute(
      `
      INSERT INTO refunds
      (
        refund_id,
        order_id,
        user_id,
        amount,
        reason,
        status,
        requested_at
      )

      VALUES
      (
        :refund_id,
        :order_id,
        :user_id,
        :amount,
        :reason,
        'Pending',
        CURRENT_TIMESTAMP
      )

      `,
      {
        refund_id,
        order_id,
        user_id,
        amount,
        reason,
      },
    );

    // CREATE CUSTOMER NOTIFICATION

    const notifId = await conn.execute(
      `
        SELECT NVL(MAX(notif_id),0)+1
        FROM notification
        `,
    );

    await conn.execute(
      `
      INSERT INTO notification
      (
        notif_id,
        user_id,
        type,
        message,
        is_read,
        sent_at
      )

      VALUES
      (
        :id,
        :user_id,
        'Refund',
        'Refund request created',
        0,
        CURRENT_TIMESTAMP
      )
      `,
      {
        id: notifId.rows[0][0],
        user_id,
      },
    );

    await conn.commit();

    res.json({
      success: true,

      message: "Refund request created",

      refund_id,
    });
  } catch (err) {
    console.log(err);

    if (conn) await conn.rollback();

    res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// ADMIN GET ALL REFUNDS

async function getAllRefunds(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

r.refund_id,
r.order_id,
u.username,
r.amount,
r.reason,
r.status,
r.requested_at

FROM refunds r

JOIN users u

ON r.user_id=u.user_id

ORDER BY r.refund_id DESC

`,
    );

    res.json({
      success: true,

      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// ADMIN UPDATE REFUND STATUS

async function updateRefund(req, res) {
  let conn;

  try {
    const { status } = req.body;

    const { refund_id } = req.params;

    conn = await getConnection();

    const refundResult = await conn.execute(
      `
SELECT user_id
FROM refunds
WHERE refund_id=:refund_id
`,
      {
        refund_id,
      },
    );

    if (refundResult.rows.length === 0) {
      return res.json({
        success: false,

        message: "Refund not found",
      });
    }

    const user_id = refundResult.rows[0][0];

    await conn.execute(
      `
UPDATE refunds

SET
status=:status,

processed_at=CURRENT_TIMESTAMP

WHERE refund_id=:refund_id

`,
      {
        status,
        refund_id,
      },
    );

    // NOTIFICATION MESSAGE

    let message = `Refund status updated: ${status}`;

    const notif = await conn.execute(
      `
SELECT NVL(MAX(notif_id),0)+1
FROM notification
`,
    );

    await conn.execute(
      `
INSERT INTO notification

(
notif_id,
user_id,
type,
message,
is_read,
sent_at
)

VALUES

(
:id,
:user_id,
'Refund',
:message,
0,
CURRENT_TIMESTAMP
)

`,
      {
        id: notif.rows[0][0],
        user_id,
        message,
      },
    );

    await conn.commit();

    res.json({
      success: true,

      message: "Refund updated",
    });
  } catch (err) {
    if (conn) await conn.rollback();

    res.status(500).json({
      success: false,

      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  requestRefund,

  getAllRefunds,

  updateRefund,
};
