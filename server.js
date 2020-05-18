/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express");
const axios = require("axios");
// const morgan = require("morgan");

const app = express();

const port = 3333;

// app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = await axios.get(req.query.url);
    res.send(data.status);
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
