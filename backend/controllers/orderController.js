const { getConnection } = require("../config/db");

async function placeOrder(req, res) {
  let conn;

  try {
    const { user_id, items, total_amount, coupon_id } = req.body;

    conn = await getConnection();

    let finalAmount = total_amount;

    // APPLY COUPON

    //     if (coupon_id) {
    //       const couponResult = await conn.execute(
    //         `
    // SELECT
    // discount_type,
    // value

    // FROM coupon

    // WHERE coupon_id=:coupon_id
    // `,
    //         {
    //           coupon_id,
    //         },
    //       );

    //       if (couponResult.rows.length) {
    //         const coupon = couponResult.rows[0];

    //         if (coupon[0] == "PERCENT") {
    //           finalAmount = total_amount - (total_amount * coupon[1]) / 100;
    //         } else {
    //           finalAmount = total_amount - coupon[1];
    //         }

    //         await conn.execute(
    //           `
    // UPDATE coupon

    // SET used_count =
    // used_count+1

    // WHERE coupon_id=:coupon_id
    // `,
    //           {
    //             coupon_id,
    //           },
    //         );
    //       }
    //     }

    // CREATE ORDER ID

    const idResult = await conn.execute(
      `
SELECT NVL(MAX(order_id),0)+1
FROM order_table
`,
    );

    const orderId = idResult.rows[0][0];

    await conn.execute(
      `
INSERT INTO order_table

(
order_id,
user_id,
coupon_id,
status,
total_amount,
payment_status,
created_at
)

VALUES

(
:order_id,
:user_id,
:coupon_id,
'Pending',
:amount,
'Unpaid',
SYSDATE
)

`,
      {
        order_id: orderId,

        user_id,

        coupon_id: coupon_id || null,

        amount: finalAmount,
      },

      {
        autoCommit: true,
      },
    );

    // INSERT ORDER ITEMS

    for (let item of items) {
      const orderItemIdResult = await conn.execute(
        `
SELECT NVL(MAX(order_item_id),0)+1
FROM order_item
`,
      );

      const orderItemId = orderItemIdResult.rows[0][0];

      await conn.execute(
        `
INSERT INTO order_item

(
order_item_id,
order_id,
item_id,
quantity,
unit_price
)

VALUES

(
:id,
:order_id,
:item_id,
:qty,
:price
)

`,

        {
          id: orderItemId,

          order_id: orderId,

          item_id: item[0],

          qty: item[2],

          price: item[3],
        },

        {
          autoCommit: true,
        },
      );
    }

    res.json({
      success: true,

      message: "Order placed successfully",

      order_id: orderId,

      amount: finalAmount,
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

async function getUserOrders(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `SELECT 
          o.order_id,
          o.status,
          o.total_amount,
          o.payment_status,
          q.token_number,
          m.name,
          oi.quantity
       FROM order_table o
       LEFT JOIN queue_token q 
         ON o.order_id = q.order_id
       LEFT JOIN order_item oi
         ON o.order_id = oi.order_id
       LEFT JOIN menu_item m
         ON oi.item_id = m.item_id
       WHERE o.user_id = :user_id
       ORDER BY o.order_id DESC`,
      { user_id },
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = { getUserOrders, placeOrder };
