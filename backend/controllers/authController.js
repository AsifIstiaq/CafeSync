const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../config/db");

async function register(req, res) {
  let conn;

  try {
    const { name, email, password, phone, role } = req.body;

    conn = await getConnection();

    const cleanRole = String(role)
      .trim()
      .replace(/[\r\n\t]/g, "")
      .toLowerCase();

    const roleResult = await conn.execute(
      `SELECT role_id 
   FROM roles 
   WHERE LOWER(role_name) = LOWER(:role)`,
      {
        role: cleanRole,
      },
    );

    const role_id = roleResult.rows[0]?.[0];

    if (!role_id) {
      return res.json({ success: false, message: "Invalid role" });
    }

    const hash = await bcrypt.hash(password, 10);

    const userIdResult = await conn.execute(`SELECT MAX(user_id) FROM users`);
    const nextUserId = (userIdResult.rows[0]?.[0] || 0) + 1;

    await conn.execute(
      `INSERT INTO users (user_id, name, email, password_hash, phone, role_id)
       VALUES (:user_id, :name, :email, :password_hash, :phone, :role_id)`,
      {
        user_id: nextUserId,
        name,
        email,
        password_hash: hash,
        phone,
        role_id,
      },
      { autoCommit: true },
    );

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

async function login(req, res) {
  let conn;

  try {
    const { email, password } = req.body;

    conn = await getConnection();

    const result = await conn.execute(
      `SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       WHERE u.email = :email`,
      { email },
    );

    if (!result.rows || result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user[3]);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user[0],
        email: user[2],
        role: user[4],
      },
      "SECRET_KEY",
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user[0],
        name: user[1],
        email: user[2],
        role: user[4],
      },
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  } finally {
    if (conn) await conn.close();
  }
}

async function logout(req, res) {
  res.json({
    success: true,
    message: "Logged out (client should remove token)",
  });
}

module.exports = { register, login, logout };
