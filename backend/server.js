const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const queueRoutes = require("./routes/queueRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const membershipRoutes = require("./routes/membershipRoutes");

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
app.use("/api/orders", orderRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/membership", membershipRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
