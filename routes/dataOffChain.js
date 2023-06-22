const express = require("express");
const {
  insertDataOffChain,
} = require("../utils/helpers/sql.helper.js/sql.helper");
const {
  getDayTimestamp,
} = require("../utils/helpers/global.helper.js/global.helper");

const router = express.Router();

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  "/connexion/:address",
  asyncMiddleware(async (req, res, next) => {
    const dayTimestamp = getDayTimestamp();
    insertDataOffChain(req.params.address, dayTimestamp);
    res.send(true);
  })
);

module.exports = router;
