const path = require('path');
const { consoleFormat } = require('winston-console-format');
const { createLogger, format, transports } = require('winston');

require('winston-daily-rotate-file');

const fileTransportOptions = {
  datePattern: 'DD-MM-YY',
  zippedArchive: true,
  maxSize: '20m'
};

const fileTransports = [
  new transports.DailyRotateFile({
    level: 'error',
    filename: path.join(__dirname, '../logs/%DATE%-error.log'),
    ...fileTransportOptions
  }),
  new transports.DailyRotateFile({
    filename: path.join(__dirname, '../logs/%DATE%-combined.log'),
    ...fileTransportOptions
  })
];

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'dnd-discord-bot' },
  transports: [...fileTransports]
});

if (process.env.NODE_ENV !== 'production') {
  const consoleTransportFormat = consoleFormat({
    showMeta: true,
    metaStrip: ['timestamp', 'service'],
    inspectOptions: {
      depth: Infinity,
      colors: true,
      maxArrayLength: Infinity,
      breakLength: 120,
      compact: Infinity
    }
  });

  const consoleTransport = new transports.Console({
    format: format.combine(
      format.colorize({ all: true }),
      format.padLevels(),
      consoleTransportFormat
    )
  });

  logger.add(consoleTransport);
}

module.exports = logger;
