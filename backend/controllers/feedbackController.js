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

    await conn.execute(
      `
UPDATE feedbacks

SET status=:status

WHERE feedback_id=:feedback_id

`,
      {
        status,
        feedback_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Feedback status updated",
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
  addFeedback,

  getAllFeedback,

  updateFeedbackStatus,
};
