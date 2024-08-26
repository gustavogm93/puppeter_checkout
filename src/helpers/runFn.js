const mlog = require("mocha-logger");

async function run(fn, errorMessage) {
  try {
    await fn();
  } catch (e) {
    mlog.error(errorMessage + ": " + e.message);
    throw new Error(errorMessage + ": " + e.message);
  }
}

async function runUncontrolled(fn, errorMessage) {
  try {
    await fn();
  } catch (e) {
    mlog.error(errorMessage + ": " + e.message);
  }
}

module.exports = { run };
