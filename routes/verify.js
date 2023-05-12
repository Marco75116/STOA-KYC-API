const express = require("express");
const axios = require("axios");
const {
  getApplicantData,
  createApplicant,
  createAccessToken,
  getApplicantStatus,
} = require("../utils/helpers/verify.helpers");
const router = express.Router();

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  "/getApplicantData/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(getApplicantData(req.params.address))
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error.response.data);
      });
  })
);

router.get(
  "/getApplicantStatus/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(getApplicantStatus(req.params.address))
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error.response.data);
      });
  })
);

router.get(
  "/getAccessToken/:address",
  asyncMiddleware(async (req, res) => {
    await axios(createAccessToken(req.params.address, "basic-kyc-level", 1200))
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.send(err.response.data);
      });
  })
);

router.post(
  "/createApplicant/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(createApplicant(req.params.address, "basic-kyc-level"))
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error.response.data);
      });
  })
);

module.exports = router;
