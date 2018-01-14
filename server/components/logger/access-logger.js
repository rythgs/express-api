import winston from 'winston';

winston.emitErrs = true;

const accessLogger = new winston.Logger({
  level: 'info',
  exitOnError: false,
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'access.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ]
});

// 連携用のwrite関数
accessLogger.stream = {
  write(message) {
    accessLogger.info(message);
  }
};

export default accessLogger;
