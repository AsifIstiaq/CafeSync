const { getConnection } = require("../config/db");

// ===============================
// ADMIN - CREATE COUPON
// ===============================

async function createCoupon(req, res) {
  let conn;

  try {
    const { code, discount_type, value, expiry, usage_limit } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
            SELECT NVL(MAX(coupon_id),0)+1
            FROM coupon
            `,
    );

    const coupon_id = idResult.rows[0][0];

    await conn.execute(
      `
            INSERT INTO coupon
            (
                coupon_id,
                code,
                discount_type,
                value,
                expiry,
                usage_limit,
                used_count
            )
            VALUES
            (
                :coupon_id,
                :code,
                :discount_type,
                :value,
                TO_DATE(:expiry,'YYYY-MM-DD'),
                :usage_limit,
                0
            )
            `,
      {
        coupon_id,
        code,
        discount_type,
        value,
        expiry,
        usage_limit,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Coupon created successfully",
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

// ===============================
// GET ALL COUPONS
// ===============================

async function getCoupons(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT
coupon_id,
code,
discount_type,
value,
expiry,
usage_limit,
used_count

FROM coupon

ORDER BY coupon_id DESC
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

// ===============================
// CUSTOMER - VALIDATE COUPON
// ===============================

async function validateCoupon(req, res) {
  let conn;

  try {
    const { code } = req.body;

    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT
coupon_id,
discount_type,
value,
expiry,
usage_limit,
used_count

FROM coupon

WHERE code=:code
`,
      {
        code,
      },
    );

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid coupon",
      });
    }

    const coupon = result.rows[0];

    const expiry = new Date(coupon[3]);

    if (expiry < new Date()) {
      return res.json({
        success: false,
        message: "Coupon expired",
      });
    }

    if (coupon[5] >= coupon[4]) {
      return res.json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    res.json({
      success: true,

      coupon_id: coupon[0],

      discount_type: coupon[1],

      value: coupon[2],
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

// UPDATE COUPON

async function updateCoupon(req, res) {
  let conn;

  try {
    const { coupon_id } = req.params;
    const { code, discount_type, value, expiry, usage_limit } = req.body;

    conn = await getConnection();

    await conn.execute(
      `
      UPDATE coupon
      SET
        code = :code,
        discount_type = :discount_type,
        value = :value,
        expiry = TO_DATE(:expiry,'YYYY-MM-DD'),
        usage_limit = :usage_limit
      WHERE coupon_id = :coupon_id
      `,
      {
        coupon_id,
        code,
        discount_type,
        value,
        expiry,
        usage_limit,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Coupon updated successfully",
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

// DELETE COUPON

async function deleteCoupon(req, res) {
  let conn;

  try {
    const { coupon_id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `
      DELETE FROM coupon
      WHERE coupon_id = :coupon_id
      `,
      {
        coupon_id,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Coupon deleted successfully",
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
  createCoupon,
  getCoupons,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
};
