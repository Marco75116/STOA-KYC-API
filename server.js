const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 6002;

const userRouterKYC = require("./routes/verify");
const userRouterDEFI = require("./routes/defi");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/verify", userRouterKYC);
app.use("/defi", userRouterDEFI);

app.listen(port);
