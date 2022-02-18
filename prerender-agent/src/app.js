const { resolve } = require("path");
const { logger, createMiddlewareLogger } = require("./logger");
const prerenderConfig = require("./config");
const proxy = require('express-http-proxy');
const forceSecure = require("force-secure-express");
const staticGzip = require("express-static-gzip");
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
app.get("*.js", (req, res, next) => {
  console.log(req.url)
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  next()
})
app.get("/", (req, res, next) => {
  console.log(req.url)
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  next()
})
app.get("*.html", (req, res, next) => {
  console.log(req.url)
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  next()
});
app.get("ads.txt", (req, res) => {
  res.redirect("//config.playwire.com/dyn_ads/1024584/73410/ads.txt")
});
app.use(staticGzip(staticPath));

process.env.SITEMAP_URL && app.get("/sitemap.xml", proxy(process.env.SITEMAP_URL));

app.get("*", (req, res) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  res.sendFile(staticHtml)
});

app.listen(port, () => {
  logger.debug(`Serving Static Path: ${public}`)
  logger.info(`${port} we have liftoff \u{1F680}`)
});