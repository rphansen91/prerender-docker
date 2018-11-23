function tagAttrs (attrs) {
  return Object.keys(attrs || {})
  .map((k) => `${k}="${attrs[k]}"`)
  .join(" ")
}

function tagValue (value) {
  if (Array.isArray(value)) return value.join("\n")
  if (typeof value === "object") return Object.keys(value)
    .map((k) => tag(k, {}, value[k]))
    .join("\n")
  if (typeof value === "number") return value + ""
  return value || ""
}

function tag (key, attrs, value) {
  return `<${key} ${tagAttrs(attrs)}>${tagValue(value)}</${key}>`
}

function sitemapUrl ({ loc, lastmod, changefreq="monthly", priority="0.8" }) {
  return tag('url', {}, {
    loc,
    lastmod,
    changefreq,
    priority
  })
}

function sitemap (urls=[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  ${tag('urlset', {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
  }, urls)}`
}

module.exports = {
  sitemap,
  sitemapUrl
}