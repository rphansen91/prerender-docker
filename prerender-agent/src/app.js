const { resolve } = require("path");
const { logger, createMiddlewareLogger } = require("./logger");
const prerenderConfig = require("./config");
const forceSecure = require("force-secure-express");
const prerender = require("prerender-node");
const express = require("express");
const app = express();

const port = Number(process.env.PORT) || 8080;
const public = process.env.PUBLIC || "../public";
const secureUrls = (process.env.SECURE_URLS || "").split(",").map(s => s.trim());
const staticPath = resolve(__dirname, public);
const staticHtml = resolve(staticPath, "index.html");

app.use(createMiddlewareLogger());

app.use(prerenderConfig({
  prerenderServiceUrl: process.env.PRERENDER_URL,
  prerenderToken: process.env.PRERENDER_TOKEN
}, prerender));

app.use(forceSecure(secureUrls));

app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(staticHtml)
});

app.listen(port, () => {
  logger.debug(`Serving Static Path: ${public}`)
  logger.info(`${port} we have liftoff \u{1F680}`)
});