export async function getConnection() {
  const oracledb = require("oracledb");

  if (!global.oracleInitialized) {
    oracledb.initOracleClient({
      libDir: "C:\\oracle\\instantclient_21_22",
    });

    global.oracleInitialized = true;
  }

  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
}
