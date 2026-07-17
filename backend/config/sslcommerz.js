require("dotenv").config();

module.exports = {
  store_id: process.env.STORE_ID,

  store_passwd: process.env.STORE_PASSWORD,

  is_live: process.env.IS_LIVE === "true",
};
