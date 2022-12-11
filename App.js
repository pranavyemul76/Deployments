const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;
const host = process.env.VERCEL_URL;
const mongoose = require("mongoose");
const Router = require("./Route");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.1.5:3000",host],
  })
);

app.use("/", Router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, host, () => {
      console.log(`server run on ${port}`);
    });
  })
  .catch((res) => {
    console.log(res);
  });
