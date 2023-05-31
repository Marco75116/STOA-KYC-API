const express = require("express");
const {
  selectAll,
  pool,
} = require("../utils/helpers/sql.helper.js/sql.helper");
const {
  getDayTimestamp,
} = require("../utils/helpers/global.helper.js/global.helper");
const {
  getCumulativeAmount,
  getArrayApy,
} = require("../utils/helpers/defi.helper");

const router = express.Router();

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  "/historyYield",
  asyncMiddleware(async (req, res, next) => {
    const dayTimestamp = getDayTimestamp();

    pool.query(
      `SELECT * FROM graph WHERE day<=${dayTimestamp}`,
      (err, result, fields) => {
        if (err) {
          console.error("err", err);
        }
        res.send(getCumulativeAmount(result));
      }
    );
  })
);

router.get(
  "/apy",
  asyncMiddleware(async (req, res, next) => {
    const dayTimestamp = getDayTimestamp() + 120 * 60;
    const daySeconds = 86400;
    const period = req.query.period;
    pool.query(
      `SELECT * FROM graph WHERE day=${dayTimestamp} 
      OR day=${dayTimestamp - period * daySeconds} `,
      (err, result, fields) => {
        if (err) {
          console.error("err", err);
        }
        res.send(getArrayApy(result));
      }
    );
  })
);

module.exports = router;
