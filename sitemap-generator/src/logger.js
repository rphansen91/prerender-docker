const winston = require("winston")
const onFinished = require("on-finished")
const onHeaders = require("on-headers")

const level = process.env.LOGGER || "info"

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({
    timestamp,
    message,
    level,
    ...rest
  }) => `${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`),
)

const transports = [
  new winston.transports.Console({
    format
  })
]

const logger = winston.createLogger({ level, transports, format });

function recordStartTime () {
  this._startAt = process.hrtime()
}

function statusCode (res) {
  const status = res.statusCode
  const color = status >= 500 ? 31 // red
  : status >= 400 ? 33 // yellow
    : status >= 300 ? 36 // cyan
      : status >= 200 ? 32 // green
        : 0 // no color

  return `\x1b[${color}m${res.statusCode}\x1b`
}

function first (arr) {
  return arr && arr[0]
}

function second (arr) {
  return arr && arr[1]
}

function responseTime (req, res) {
  return ((first(res._startAt) - first(req._startAt)) * 1e3 + (second(res._startAt) - second(req._startAt)) * 1e-6).toFixed(3)
}

function createMiddlewareLogger () {
  return (req, res, next) => {
    function logRequest () {
      logger.debug(`\x1b[0m${req.method} ${req.url} ${statusCode(res)}[0m ${responseTime(req, res)} ms\x1b[0m`);
    }

    res._startAt = undefined;
    recordStartTime.call(req);
    onHeaders(res, recordStartTime);
    onFinished(res, logRequest);
    next();
  }
}

module.exports = {
  logger,
  createMiddlewareLogger
};