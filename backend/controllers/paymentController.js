const SSLCommerzPayment = require("sslcommerz-lts");
const { getConnection } = require("../config/db");
const sslConfig = require("../config/sslcommerz");

// CREATE PAYMENT SESSION

async function createPayment(req, res) {
  let conn;

  try {
    const { order_id } = req.params;

    conn = await getConnection();

    const orderResult = await conn.execute(
      `
SELECT 
order_id,
total_amount,
user_id
FROM order_table
WHERE order_id=:id
`,
      {
        id: order_id,
      },
    );

    if (orderResult.rows.length === 0) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    const order = orderResult.rows[0];

    const paymentIdResult = await conn.execute(
      `
SELECT NVL(MAX(payment_id),0)+1 
FROM payment
`,
    );

    const payment_id = paymentIdResult.rows[0][0];

    await conn.execute(
      `
INSERT INTO payment
(
payment_id,
order_id,
method,
amount,
status
)
VALUES
(
:id,
:order_id,
'SSLCommerz',
:amount,
'Pending'
)
`,
      {
        id: payment_id,
        order_id,
        amount: order[1],
      },
      {
        autoCommit: true,
      },
    );

    const data = {
      total_amount: order[1],

      currency: "BDT",

      tran_id: "CAFESYNC_" + payment_id,

      success_url: `${process.env.BACKEND_URL}/api/payment/success`,

      fail_url: `${process.env.BACKEND_URL}/api/payment/fail`,

      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,

      ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn`,

      shipping_method: "NO",

      product_name: "CafeSync Food Order",

      product_category: "Food",

      product_profile: "general",

      cus_name: "CafeSync Customer",

      cus_email: "customer@gmail.com",

      cus_add1: "Khulna",

      cus_city: "Khulna",

      cus_country: "Bangladesh",

      cus_phone: "01700000000",

      value_a: order_id,
    };

    const sslcz = new SSLCommerzPayment(
      sslConfig.store_id,
      sslConfig.store_passwd,
      sslConfig.is_live,
    );

    const apiResponse = await sslcz.init(data);

    let GatewayPageURL = apiResponse.GatewayPageURL;

    res.json({
      success: true,

      url: GatewayPageURL,
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

// SUCCESS CALLBACK

async function paymentSuccess(req, res) {
  let conn;

  try {
    const {
      tran_id,

      val_id,

      value_a,
    } = req.body;

    conn = await getConnection();

    await conn.execute(
      `
UPDATE payment
SET 
transaction_id=:tran,
status='Success',
paid_at=SYSTIMESTAMP
WHERE payment_id=
(
SELECT payment_id
FROM payment
WHERE order_id=:order_id
)
`,
      {
        tran: tran_id,
        order_id: value_a,
      },
    );

    await conn.execute(
      `
UPDATE order_table
SET payment_status='Paid'
WHERE order_id=:id
`,
      {
        id: value_a,
      },
      {
        autoCommit: true,
      },
    );

    res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/payment/fail`);
  } finally {
    if (conn) await conn.close();
  }
}

async function paymentFail(req, res) {
  res.redirect(`${process.env.FRONTEND_URL}/payment/fail`);
}

async function paymentCancel(req, res) {
  res.redirect(`${process.env.FRONTEND_URL}/payment/cancel`);
}

async function paymentIPN(req, res) {
  res.sendStatus(200);
}

module.exports = {
  createPayment,

  paymentSuccess,

  paymentFail,

  paymentCancel,

  paymentIPN,
};
