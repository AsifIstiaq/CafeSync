const oracledb = require("oracledb");

oracledb.initOracleClient({
  libDir: "C:\\oracle\\instantclient_21_22",
});

const dbConfig = {
  user: "CAFESYNC",
  password: "cafesync123",
  connectString: "localhost:1521/XE",
};

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

module.exports = { getConnection };
