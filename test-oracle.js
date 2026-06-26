// test-connection.js
const oracledb = require("oracledb");

oracledb.initOracleClient({
  libDir: "C:\\oracle\\instantclient_21_22",
});

async function run() {
  try {
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER || "CAFESYNC",
      password: process.env.DB_PASSWORD || "cafesync123",
      connectString: process.env.DB_CONNECT_STRING || "localhost:1521/XE",
    });

    console.log("Connected!");
    await conn.close();
  } catch (e) {
    console.error(e);
  }
}

run();
