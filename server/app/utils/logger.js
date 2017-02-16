const winston = require('winston')

winston.emitErrs = true

const path = require('path')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      json: false
    }),
    new (winston.transports.File)({
      level: 'info',
      filename: path.join(__dirname, 'logs/allLogs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //  5MB
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
})

module.exports = logger

module.exports.stream = {
  write: (message) => {
    logger.info(message)
  }
}
