import winston from 'winston';
import 'winston-daily-rotate-file';

winston.emitErrs = true;

const logger = new winston.Logger({
  level: 'info',
  exitOnError: false,
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      dirname: './logs',
      filename: 'application.log',
      json: false,
      handleExceptions: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
  ],
});

export default logger;
