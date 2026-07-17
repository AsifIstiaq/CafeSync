const { getConnection } = require("../config/db");

// GET ALL TABLES

async function getTables(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
SELECT *
FROM cafe_table
WHERE status='available'
ORDER BY table_id DESC
`,
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

// ADD TABLE

async function addTable(req, res) {
  let conn;

  try {
    const { table_number, capacity, status, location } = req.body;

    conn = await getConnection();

    const idResult = await conn.execute(
      `
SELECT NVL(MAX(table_id),0)+1
FROM cafe_table
`,
    );

    const table_id = idResult.rows[0][0];

    await conn.execute(
      `
INSERT INTO cafe_table
(
table_id,
table_number,
capacity,
status,
location
)

VALUES
(
:table_id,
:table_number,
:capacity,
:status,
:location
)
`,

      {
        table_id,
        table_number,
        capacity,
        status,
        location,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,
      message: "Table added successfully",
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

// UPDATE TABLE

async function updateTable(req, res) {
  let conn;

  try {
    const { id } = req.params;

    const { table_number, capacity, status, location } = req.body;

    conn = await getConnection();

    await conn.execute(
      `
UPDATE cafe_table

SET

table_number=:table_number,

capacity=:capacity,

status=:status,

location=:location


WHERE table_id=:id
`,

      {
        id,
        table_number,
        capacity,
        status,
        location,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Table updated successfully",
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

// DELETE TABLE

async function deleteTable(req, res) {
  let conn;

  try {
    const { id } = req.params;

    conn = await getConnection();

    await conn.execute(
      `
DELETE FROM cafe_table
WHERE table_id=:id
`,

      {
        id,
      },

      {
        autoCommit: true,
      },
    );

    res.json({
      success: true,

      message: "Table deleted successfully",
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
  addTable,
  updateTable,
  deleteTable,
};
