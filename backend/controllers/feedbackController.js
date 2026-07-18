const { getConnection } = require("../config/db");

// ======================================
// CUSTOMER - ADD FEEDBACK
// ======================================

async function addFeedback(req, res) {
  let conn;

  try {
    const { user_id, subject, message, rating } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
SELECT NVL(MAX(feedback_id),0)+1
FROM feedbacks
`,
    );

    const feedback_id = idResult.rows[0][0];

    await conn.execute(
      `
INSERT INTO feedbacks

(
feedback_id,
user_id,
subject,
message,
rating
)

VALUES

(
:feedback_id,
:user_id,
:subject,
:message,
:rating
)

`,
      {
        feedback_id,
        user_id,
        subject,
        message,
        rating,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Feedback submitted successfully",
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

// ======================================
// ADMIN - GET ALL FEEDBACK
// ======================================

async function getAllFeedback(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

f.feedback_id,

u.name,

u.email,

f.subject,

f.message,

f.rating,

f.status,

f.created_at


FROM feedbacks f


JOIN users u

ON f.user_id=u.user_id


ORDER BY f.feedback_id DESC

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

// ======================================
// ADMIN - UPDATE FEEDBACK STATUS
// ======================================

async function updateFeedbackStatus(req, res) {
  let conn;

  try {
    const { feedback_id } = req.params;
    const { status } = req.body;

    conn = await getConnection();

    // Find feedback owner

    const feedbackResult = await conn.execute(
      `
      SELECT user_id
      FROM feedbacks
      WHERE feedback_id = :feedback_id
      `,
      {
        feedback_id,
      },
    );

    if (feedbackResult.rows.length === 0) {
      return res.json({
        success: false,
        message: "Feedback not found",
      });
    }

    const user_id = feedbackResult.rows[0][0];

    // Update feedback status

    await conn.execute(
      `
      UPDATE feedbacks
      SET status = :status
      WHERE feedback_id = :feedback_id
      `,
      {
        status,
        feedback_id,
      },
    );

    // Generate notification id

    const notifResult = await conn.execute(
      `
      SELECT NVL(MAX(notif_id),0)+1
      FROM notification
      `,
    );

    const notif_id = notifResult.rows[0][0];

    // Notification message

    let message = `Your feedback has been ${status.toLowerCase()}. Thank you for helping us improve CafeSync.`;

    // Insert notification

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
        :notif_id,
        :user_id,
        'Feedback',
        :message,
        0,
        CURRENT_TIMESTAMP
      )
      `,
      {
        notif_id,
        user_id,
        message,
      },
    );

    await conn.commit();

    res.json({
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (err) {
    if (conn) await conn.rollback();

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
  addFeedback,

  getAllFeedback,

  updateFeedbackStatus,
};
