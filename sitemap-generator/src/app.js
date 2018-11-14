const { resolve } = require("path");
const { logger, createMiddlewareLogger } = require("./logger");
const { supplyListingsQuery } = require("./queries");
const { sitemap, sitemapUrl } = require("./sitemap");
const express = require("express");
const fetch = require("node-fetch");
const app = express();

const port = Number(process.env.PORT) || 6006;
const graphqlUrl = process.env.GRAPHQL || "http://localhost:5000/graphql";

const base = process.env.BASE_URL || "";
const defaultPaths = (process.env.DEFAULT_PATHS || "")
.split(",")
.map(s => s.trim());

app.use(createMiddlewareLogger());

app.get("/sitemap.xml", (req, res) => {
  return fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: supplyListingsQuery })
  })
  .then(r => r.json())
  .then(r => {
    if (r.errors) throw r.errors[0];
    return r.data.supplyListings;
  })
  .then(data => {
    res.writeHead(200, {
      'Content-Type': 'text/xml'
    });
    res.end(sitemap(
      defaultPaths.map(url => ({ url, priority: 1 }))
      .concat(data)
      .filter(v => v && v.url)
      .map((v) => Object.assign({}, v, {
        createdDate: formatDate(v.createdDate)
      }))
      .map(({ url, createdDate: lastmod }) => sitemapUrl({
        loc: base + url,
        lastmod
      }))
    ));
  })
  .catch(e => {
    res.writeHead(500);
    res.end(e.message);
  });
})

app.listen(port, (e) => {
  logger.info(`${port} we have liftoff \u{1F680}`)
});

function formatDate (date) {
  let d = date ? new Date(date) : new Date,
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}