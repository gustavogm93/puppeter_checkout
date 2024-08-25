const mlog = require("mocha-logger");
const puppeteer = require("puppeteer");

async function getSummaryAmount(targetPage) {
  try {
    const element = await targetPage.$(
      '[data-test-id="breakdown-total-amount"]'
    );
    const amount = await element.evaluate((x) => x.textContent);
    return amount;
  } catch (e) {
    mlog.error("Failed at getting amount" + e);
    return;
  }
}

module.exports = { getSummaryAmount };
