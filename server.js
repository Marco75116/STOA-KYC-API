const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 6002;

app.get("/", (req, res) => {
  res.send("HI");
});

const userRouter = require("./routes/verify");
app.use(cors());
app.use(express.json());
app.use("/verify", userRouter);

app.listen(port);
