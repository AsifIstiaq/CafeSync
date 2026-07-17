const { getConnection } = require("../config/db");

// GET USER NOTIFICATIONS

async function getUserNotifications(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

notif_id,
type,
message,
is_read,
sent_at

FROM notification

WHERE user_id=:user_id

ORDER BY notif_id DESC

`,
      {
        user_id,
      },
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

// MARK READ

async function markRead(req, res) {
  let conn;

  try {
    const { notif_id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `
UPDATE notification

SET is_read=1

WHERE notif_id=:notif_id

`,
      {
        notif_id,
      },
    );

    await conn.commit();

    res.json({
      success: true,

      message: "Notification marked read",
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

module.exports = {
  getUserNotifications,

  markRead,
};
