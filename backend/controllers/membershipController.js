const { getConnection } = require("../config/db");

// ==========================================
// CUSTOMER - GET OWN MEMBERSHIP CARD
// ==========================================

async function getUserMembership(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

card_id,
tier,
points,
issue_date,
expiry_date

FROM membership_card

WHERE user_id=:user_id

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

// ==========================================
// ADMIN - GET ALL MEMBERSHIP CARDS
// ==========================================

async function getAllMembership(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `

SELECT

m.card_id,

u.name,

u.email,

m.tier,

m.points,

m.issue_date,

m.expiry_date


FROM membership_card m


JOIN users u

ON m.user_id=u.user_id


ORDER BY m.card_id DESC


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

// ==========================================
// ADMIN - CREATE MEMBERSHIP CARD
// ==========================================

async function createMembership(req, res) {
  let conn;

  try {
    const {
      user_id,

      tier,

      points,

      expiry_date,
    } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
SELECT NVL(MAX(card_id),0)+1
FROM membership_card
`,
    );

    const card_id = idResult.rows[0][0];

    await conn.execute(
      `
INSERT INTO membership_card

(
card_id,
user_id,
tier,
points,
issue_date,
expiry_date
)

VALUES

(
:card_id,
:user_id,
:tier,
:points,
SYSDATE,
TO_DATE(:expiry_date,'YYYY-MM-DD')
)

`,
      {
        card_id,
        user_id,
        tier,
        points,
        expiry_date,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Membership card created",
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

// ==========================================
// ADMIN - UPDATE MEMBERSHIP CARD
// ==========================================

async function updateMembership(req, res) {
  let conn;

  try {
    const { card_id } = req.params;

    const {
      tier,

      points,

      expiry_date,
    } = req.body;

    conn = await getConnection();

    await conn.execute(
      `

UPDATE membership_card

SET

tier=:tier,

points=:points,

expiry_date=
TO_DATE(:expiry_date,'YYYY-MM-DD')


WHERE card_id=:card_id


`,

      {
        tier,
        points,
        expiry_date,
        card_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Membership updated",
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

// ==========================================
// ADMIN - DELETE MEMBERSHIP CARD
// ==========================================

async function deleteMembership(req, res) {
  let conn;

  try {
    const { card_id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `

DELETE FROM membership_card

WHERE card_id=:card_id

`,

      {
        card_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Membership deleted",
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
  getUserMembership,

  getAllMembership,

  createMembership,

  updateMembership,

  deleteMembership,
};
