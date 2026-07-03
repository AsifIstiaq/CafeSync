const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

oracledb.initOracleClient({
  libDir: "C:\\oracle\\instantclient_21_22",
});

const dbConfig = {
  user: "CAFESYNC",
  password: "cafesync123",
  connectString: "localhost:1521/XE",
};

app.get("/", (req, res) => {
  res.json({ status: "backend running" });
});

app.get("/test-db", async (req, res) => {
  let conn;

  try {
    conn = await oracledb.getConnection(dbConfig);

    const result = await conn.execute("SELECT USER, SYSDATE FROM DUAL");

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Oracle Error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (e) {}
    }
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/inventory", inventoryRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
