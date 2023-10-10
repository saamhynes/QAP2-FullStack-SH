const fs = require("fs");
const path = require("path");
const { EventEmitter } = require("events");

const logDir = "./logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function getLogFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return path.join(logDir, `${year}-${month}-${day}.log`);
}

class MyLogger extends EventEmitter {
  log(message) {
    const logFileName = getLogFileName();
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;

    // log to the console
    console.log(logMessage);

    // log to the file
    fs.appendFile(logFileName, logMessage, (err) => {
      if (err) {
        console.log("Error writing to log file:", err);
      }
    });
  }

  error(message) {
    const logFileName = getLogFileName();
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;

    // log to the console
    console.error(logMessage);

    // log to the file
    fs.appendFile(logFileName, logMessage, (err) => {
      if (err) {
        console.log("Error writing to log file:", err);
      }
    });
  }
}

const myLogger = new MyLogger();
module.exports = MyLogger;
