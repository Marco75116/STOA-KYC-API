const express = require("express");
const {
  insertDataOffChain,
  insertForm,
  checkExistDataOffChain,
  getProfilData,
  modifyForm,
} = require("../utils/helpers/sql.helper.js/sql.helper");
const {
  getDayTimestamp,
} = require("../utils/helpers/global.helper.js/global.helper");
const { ethers } = require("ethers");

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

router.get(
  "/form/:address",
  asyncMiddleware(async (req, res, next) => {
    insertForm(
      req.params.address,
      req.query.firstName,
      req.query.lastName,
      req.query.email,
      req.query.marketing,
      req.query.signature
    );
    res.send(true);
  })
);

router.get(
  "/modifyForm",
  asyncMiddleware(async (req, res, next) => {
    const message = "I certify the truthfulness of the informations provided.";
    const address = ethers.verifyMessage(message, req.query.signature);

    modifyForm(
      address,
      req.query.firstName,
      req.query.lastName,
      req.query.email
    );
    res.send(true);
  })
);

router.get(
  "/checkDataOffChain/:address",
  asyncMiddleware(async (req, res, next) => {
    const result = await checkExistDataOffChain(req.params.address);
    res.send(result);
  })
);

router.get(
  "/getProfilData/:address",
  asyncMiddleware(async (req, res, next) => {
    const result = await getProfilData(req.params.address);
    res.send(result);
  })
);

module.exports = router;
