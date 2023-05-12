require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const FormData = require("form-data");

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN;
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
const SUMSUB_BASE_URL = process.env.SUMSUB_BASE_URL;
const levelName = "basic-kyc-level";

var config = {};
config.baseURL = SUMSUB_BASE_URL;

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

function createSignature(config) {
  console.log("Creating a signature for the request...");

  var ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(config.data);
  }

  config.headers["X-App-Access-Ts"] = ts;
  config.headers["X-App-Access-Sig"] = signature.digest("hex");

  return config;
}

const createApplicant = (externalUserId, levelName) => {
  console.log("Creating an applicant...");

  var method = "post";
  var url = "/resources/applicants?levelName=" + levelName;
  var ts = Math.floor(Date.now() / 1000);

  var body = {
    externalUserId: externalUserId,
  };

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(body);

  return config;
};

function addDocument(applicantId) {
  console.log("Adding document to the applicant...");

  var method = "post";
  var url = `/resources/applicants/${applicantId}/info/idDoc`;
  var filePath = "resources/sumsub-logo.png";

  var metadata = {
    idDocType: "PASSPORT",
    country: "GBR",
  };

  var form = new FormData();
  form.append("metadata", JSON.stringify(metadata));

  var content = fs.readFileSync(filePath);
  console.log("content PNG", content);
  form.append("content", content, filePath);

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = Object.assign(headers, form.getHeaders());
  config.data = form;

  return config;
}

const getApplicantStatus = (applicantId) => {
  console.log("Getting the applicant status...");

  var method = "get";
  var url = `/resources/applicants/${applicantId}/status`;

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
};

const getApplicantData = (externalUserId) => {
  var method = "get";
  var url = `/resources/applicants/-;externalUserId=${externalUserId}/one`;

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;
  return config;
};

function createAccessToken(
  externalUserId,
  levelName = "basic-kyc-level",
  ttlInSecs = 600
) {
  console.log("Creating an access token for initializng SDK...");

  var method = "post";
  var url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
}

module.exports = {
  getApplicantData,
  createApplicant,
  createAccessToken,
  getApplicantStatus,
};
