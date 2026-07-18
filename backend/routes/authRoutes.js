const express = require("express");
const {
  register,
  login,
  userLogin,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/user-login", userLogin);
router.post("/logout", logout);

module.exports = router;
