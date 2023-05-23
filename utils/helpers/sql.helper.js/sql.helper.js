const { createPool } = require("mysql");
const { getDayTimestamp } = require("../global.helper.js/global.helper");
require("dotenv").config();

const pool = createPool({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
  connectionLimit: 10,
});

const selectAll = async () => {
  const dayTimestamp = getDayTimestamp();
  pool.query(
    `SELECT * FROM graph WHERE day<=${dayTimestamp}`,
    (err, result, fields) => {
      if (err) {
        return console.error("err", err);
      }
    }
  );
};

module.exports = {
  selectAll,
  pool,
};
