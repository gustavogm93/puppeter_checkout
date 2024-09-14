const mlog = require("mocha-logger");
const puppeteer = require("puppeteer");

async function getSummaryAmount(targetPage, isSubscription) {
  try {
    const subscriptionSelector =
      "[data-testid='ResumeSubscription-amountTotal']";
    const onePaySelector = "[data-test-id='breakdown-total-amount']"; //SE LLAMARA -> orderSummary-totalPayment
    const selector = isSubscription ? subscriptionSelector : onePaySelector;
    const element = await targetPage.$(selector);
    const amount = await element.evaluate((x) => x.textContent);
    return amount;
  } catch (e) {
    mlog.error("Failed at getting amount " + e);
    return;
  }
}

module.exports = { getSummaryAmount };
