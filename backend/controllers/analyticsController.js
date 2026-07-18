const { getConnection } = require("../config/db");

// ======================================
// SALES REPORT
// ======================================

async function salesReport(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT
    COUNT(order_id),
    NVL(SUM(total_amount),0)
FROM order_table
WHERE LOWER(payment_status) = 'paid'

`,
    );

    res.json({
      success: true,

      data: {
        total_orders: result.rows[0][0],

        total_sales: result.rows[0][1],
      },
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
// TOP FOODS
// ======================================

async function topFoods(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT *
FROM
(
    SELECT
        m.name,
        SUM(o.quantity) AS total_sold

    FROM order_item o

    JOIN menu_item m
    ON o.item_id = m.item_id

    GROUP BY m.name

    ORDER BY SUM(o.quantity) DESC
)

WHERE ROWNUM <= 5
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
// FEEDBACK ANALYTICS
// ======================================

async function feedbackAnalytics(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT

COUNT(feedback_id),

AVG(rating)


FROM feedbacks

`,
    );

    res.json({
      success: true,

      data: {
        total_feedback: result.rows[0][0],

        average_rating: result.rows[0][1],
      },
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
  salesReport,

  topFoods,

  feedbackAnalytics,
};
