const { getConnection } = require("../config/db");

// ======================================
// CUSTOMER - GET AVAILABLE PLANS
// ======================================

async function getPlans(req, res) {
  try {
    res.json({
      success: true,

      data: [
        {
          plan_type: "DAILY",
          title: "Daily Meal Subscription",
          price: 250,
          duration: 1,
        },
        {
          plan_type: "MONTHLY",
          title: "Monthly Meal Package",
          price: 6000,
          duration: 30,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================================
// CUSTOMER - CREATE SUBSCRIPTION
// ======================================

async function createSubscription(req, res) {
  let conn;

  try {
    const { user_id, plan_type } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
SELECT NVL(MAX(sub_id),0)+1
FROM subscription
`,
    );

    const sub_id = idResult.rows[0][0];

    let price;
    let duration;

    if (plan_type === "DAILY") {
      price = 250;
      duration = 1;
    } else if (plan_type === "MONTHLY") {
      price = 6000;
      duration = 30;
    } else {
      return res.json({
        success: false,
        message: "Invalid plan type",
      });
    }

    await conn.execute(
      `
INSERT INTO subscription

(
sub_id,
user_id,
plan_type,
start_date,
end_date,
price,
status
)

VALUES

(
:sub_id,
:user_id,
:plan_type,
SYSDATE,
SYSDATE+:duration,
:price,
'Active'
)

`,
      {
        sub_id,
        user_id,
        plan_type,
        duration,
        price,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Subscription created successfully",
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
// CUSTOMER - VIEW OWN SUBSCRIPTIONS
// ======================================

async function getUserSubscriptions(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

sub_id,
plan_type,
start_date,
end_date,
price,
status

FROM subscription

WHERE user_id=:user_id

ORDER BY sub_id DESC

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

// ======================================
// CUSTOMER - CANCEL SUBSCRIPTION
// ======================================

async function cancelSubscription(req, res) {
  let conn;

  try {
    const { sub_id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `
UPDATE subscription

SET status='Cancelled'

WHERE sub_id=:sub_id

`,
      {
        sub_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Subscription cancelled",
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
// ADMIN - VIEW ALL SUBSCRIPTIONS
// ======================================

async function getAllSubscriptions(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

s.sub_id,

u.name,

u.email,

s.plan_type,

s.price,

s.start_date,

s.end_date,

s.status


FROM subscription s


JOIN users u

ON s.user_id=u.user_id


ORDER BY s.sub_id DESC

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
// ADMIN - UPDATE STATUS
// ======================================

async function updateSubscriptionStatus(req, res) {
  let conn;

  try {
    const { sub_id } = req.params;

    const { status } = req.body;

    conn = await getConnection();

    await conn.execute(
      `
UPDATE subscription

SET status=:status

WHERE sub_id=:sub_id

`,
      {
        status,
        sub_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Subscription status updated",
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
  getPlans,

  createSubscription,

  getUserSubscriptions,

  cancelSubscription,

  getAllSubscriptions,

  updateSubscriptionStatus,
};
