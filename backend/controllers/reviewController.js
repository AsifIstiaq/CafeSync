const { getConnection } = require("../config/db");

// ADD REVIEW

async function addReview(req, res) {
  let conn;

  try {
    const { user_id, item_id, rating, comment } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
            SELECT NVL(MAX(review_id),0)+1
            FROM review
            `,
    );

    const review_id = idResult.rows[0][0];

    await conn.execute(
      `
            INSERT INTO review
            (
                review_id,
                user_id,
                item_id,
                rating,
                review_comment
            )
            VALUES
            (
                :review_id,
                :user_id,
                :item_id,
                :rating,
                :review_text
            )
            `,
      {
        review_id,
        user_id,
        item_id,
        rating,
        review_text: comment,
      },
      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Review added successfully",
    });
  } catch (err) {
    console.error("ADD REVIEW ERROR:", err);
    res.status(500).json({
      success: false,

      message: err.message,
    });
  } finally {
    if (conn) await conn.close();
  }
}

// GET REVIEWS BY ITEM

async function getItemReviews(req, res) {
  let conn;

  try {
    const { item_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `
            SELECT
                r.review_id,
                u.name,
                r.rating,
                r.review_comment,
                r.created_at
            FROM review r

            JOIN users u
            ON r.user_id=u.user_id

            WHERE r.item_id=:item_id

            ORDER BY r.created_at DESC
            `,
      {
        item_id,
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

// DELETE REVIEW (optional admin)

async function deleteReview(req, res) {
  let conn;

  try {
    const { review_id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `
            DELETE FROM review
            WHERE review_id=:id
            `,

      {
        id: review_id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Review deleted",
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
  addReview,

  getItemReviews,

  deleteReview,
};
