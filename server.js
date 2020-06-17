/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express");
const path = require("path");
const axios = require("axios");
const responseTime = require("response-time");
const helmet = require("helmet");
const throttle = require("express-throttle");
const NodeCache = require("node-cache");
// const morgan = require("morgan");

const app = express();
const cache = new NodeCache();
const port = 3333;
const CACHE_TTL = 300;

// app.use(morgan("dev"));
app.use(responseTime());
app.use(
  helmet({
    frameguard: false,
  })
);
app.get("/api", throttle({ burst: 50, period: "60s" }), async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "X-Response-Time");
  try {
    // const interval = req.query.ttl * 1000;
    const cached = cache.get(req.query.url);
    if (!cached) {
      console.log("/api CACHE UPDATE", req.query.url);
      const response = await axios.get(req.query.url, { timeout: 3000 });
      cache.set(
        req.query.url,
        { status: response.status, size: null },
        CACHE_TTL
      );
      res.send({ status: response.status, size: null });
    } else {
      console.log("/api CACHE HIT", req.query.url);
      res.send(cached);
    }
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/html", throttle({ burst: 50, period: "60s" }), async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "X-Response-Time");
  try {
    const interval = req.query.ttl * 1000;
    const cached = cache.get(req.query.url);
    if (!cached) {
      console.log("/html CACHE UPDATE", req.query.url);
      const response = await axios.get(req.query.url, { timeout: interval });
      if (response.data.includes("<div")) {
        const buf = Buffer.from(response.data);
        cache.set(
          req.query.url,
          { status: response.status, size: buf.length },
          CACHE_TTL
        );
        res.send({ status: response.status, size: buf.length });
      }
    } else {
      console.log("/html CACHE HIT", req.query.url);
      res.send(cached);
    }
  } catch (err) {
    res.status(500).end();
  }
});

app.use("/healthcheck", express.static(path.resolve(__dirname, "./build")));

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
