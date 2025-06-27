const fs = require('fs');
const path = require('path');
const Log = require('../utils/loggerClient');

module.exports = async function customLogger(req, res, next) {
  const logText = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  const logPath = path.join(__dirname, '../logs/server.log');

  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }

  fs.appendFileSync(logPath, logText);

  // External log API call
  await Log("backend", "info", "middleware", `${req.method} ${req.originalUrl}`);

  next();
};
