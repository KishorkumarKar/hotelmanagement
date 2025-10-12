import winston from "winston";

const transports = [];

if (process.env.NODE_ENV !== "production") {
  transports.push(
    ...[
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.json(),
          winston.format.colorize(),
        ),
      }),
      new winston.transports.File({
        filename: "log/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "log/combined.log" }),
    ],
  );
} else {
  transports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: "School Management" },
  transports,
});

export default logger;
