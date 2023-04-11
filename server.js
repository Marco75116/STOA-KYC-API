const express = require("express");
const app = express();

const port = process.env.PORT || 6002;

app.get("/", (req, res) => {
  res.send("HI");
});

const userRouter = require("./routes/verify");

app.use(express.json());
app.use("/verify", userRouter);

app.listen(port);
