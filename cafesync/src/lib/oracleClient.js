let oracledb;
let initialized = false;

function init() {
  if (!initialized) {
    oracledb = require("oracledb");

    oracledb.initOracleClient({
      libDir: "C:\\oracle\\instantclient_21_22",
    });

    initialized = true;
  }
}

async function getConnection() {
  init();

  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
}

module.exports = { getConnection };
