/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express");
const axios = require("axios");
const responseTime = require("response-time");
// const morgan = require("morgan");

const app = express();

const port = 3333;

// app.use(morgan("dev"));
app.use(responseTime());

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "X-Response-Time");
  try {
    const interval = (req.query.ttl || 30) * 1000;
    const response = await axios.get(req.query.url, { timeout: interval });
    res.send({status: response.status, size: null});
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/html", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "X-Response-Time");
  try {
    const interval = (req.query.ttl || 30) * 1000;
    const response = await axios.get(req.query.url, { timeout: interval });
    if (response.data.includes("<div")) {
      const buf = Buffer.from(response.data);
      res.send({ status: response.status, size: buf.length });
    }
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
