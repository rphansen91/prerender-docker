const { logger } = require("./logger");

function configure (opts, fn=v => v) {
  return obj => Object.keys(opts)
  .filter(k => opts[k])
  .reduce(fn, obj)
}

module.exports = function prerenderConfig (opts={}, prerender) {

  logger.debug("Configuring prerender", opts);

  function set (k, v) {
    return prerender.set(k, v)
  }

  return Object.keys(opts)
  .filter(k => opts[k])
  .reduce((acc, k) => acc.set(k, opts[k]), prerender);
}