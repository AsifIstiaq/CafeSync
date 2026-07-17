const { getConnection } = require("../config/db");

// ================================
// GET ALL TABLES
// ================================

async function getTables(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT
          table_id,
          table_number,
          capacity,
          status,
          location
       FROM cafe_table
       ORDER BY table_number`,
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

// ================================
// RESERVE TABLE
// ================================

// ================================
// RESERVE TABLE WITH AVAILABILITY CHECK
// ================================

async function reserveTable(req, res) {
  let conn;

  try {
    const { user_id, table_id, reserved_at, party_size } = req.body;

    conn = await getConnection();

    // Check table status

    const tableCheck = await conn.execute(
      `
      SELECT 
          status,
          capacity
      FROM cafe_table
      WHERE table_id=:id
      `,

      {
        id: table_id,
      },
    );

    if (tableCheck.rows.length === 0) {
      return res.json({
        success: false,
        message: "Table not found",
      });
    }

    const tableStatus = tableCheck.rows[0][0];
    const capacity = tableCheck.rows[0][1];

    // Check inactive table

    if (tableStatus.toLowerCase() === "inactive") {
      return res.json({
        success: false,
        message: "This table is currently unavailable",
      });
    }

    // Check occupied table

    if (tableStatus.toLowerCase() === "occupied") {
      return res.json({
        success: false,
        message: "This table is already occupied",
      });
    }

    // Check capacity

    if (party_size > capacity) {
      return res.json({
        success: false,
        message: `Maximum capacity is ${capacity} persons`,
      });
    }

    // Check existing reservation

    const existing = await conn.execute(
      `
      SELECT COUNT(*)
      FROM reservation
      WHERE table_id=:table_id
      AND status='Approved'
      `,

      {
        table_id,
      },
    );

    if (existing.rows[0][0] > 0) {
      return res.json({
        success: false,
        message: "Table already reserved",
      });
    }

    // Generate reservation id

    const idResult = await conn.execute(
      `
      SELECT NVL(MAX(reservation_id),0)+1
      FROM reservation
      `,
    );

    const reservation_id = idResult.rows[0][0];

    // Insert reservation

    await conn.execute(
      `
      INSERT INTO reservation
      (
        reservation_id,
        user_id,
        table_id,
        reserved_at,
        party_size,
        status
      )

      VALUES

      (
        :reservation_id,
        :user_id,
        :table_id,
        TO_TIMESTAMP(
        :reserved_at,
        'YYYY-MM-DD"T"HH24:MI'
        ),
        :party_size,
        'Pending'
      )

      `,

      {
        reservation_id,
        user_id,
        table_id,
        reserved_at,
        party_size,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Reservation request submitted",
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

// ================================
// USER RESERVATIONS
// ================================

async function myReservations(req, res) {
  let conn;

  try {
    const { user_id } = req.params;

    conn = await getConnection();

    const result = await conn.execute(
      `SELECT

          r.reservation_id,
          c.table_number,
          r.reserved_at,
          r.party_size,
          r.status

       FROM reservation r

       JOIN cafe_table c

       ON r.table_id=c.table_id

       WHERE r.user_id=:id

       ORDER BY r.reservation_id DESC`,

      { id: user_id },
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

// ==========================
// GET ALL RESERVATIONS
// ==========================

async function getAllReservations(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT
        r.reservation_id,
        u.name,
        c.table_number,
        r.party_size,
        r.reserved_at,
        r.status
      FROM reservation r
      JOIN users u
        ON r.user_id = u.user_id
      JOIN cafe_table c
        ON r.table_id = c.table_id
      ORDER BY r.reservation_id DESC
    `);

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

async function updateReservationStatus(req, res) {
  let conn;

  try {
    const { reservation_id, status } = req.body;

    conn = await getConnection();

    /*
Get table id
*/

    const result = await conn.execute(
      `
SELECT table_id
FROM reservation
WHERE reservation_id=:id
`,

      {
        id: reservation_id,
      },
    );

    const table_id = result.rows[0][0];

    // Update reservation

    await conn.execute(
      `
UPDATE reservation
SET status=:status
WHERE reservation_id=:id
`,

      {
        status,
        id: reservation_id,
      },
    );

    // If approved

    if (status === "Approved") {
      await conn.execute(
        `
UPDATE cafe_table
SET status='occupied'
WHERE table_id=:id
`,

        {
          id: table_id,
        },
      );
    }

    // If rejected

    if (status === "Rejected") {
      await conn.execute(
        `
UPDATE cafe_table
SET status='available'
WHERE table_id=:id
`,

        {
          id: table_id,
        },
      );
    }

    await conn.commit();

    res.json({
      success: true,
      message: "Reservation updated",
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

module.exports = {
  getTables,
  reserveTable,
  myReservations,
  getAllReservations,
  updateReservationStatus,
};
