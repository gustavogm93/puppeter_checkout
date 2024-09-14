const puppeteer = require("puppeteer");
const mlog = require("mocha-logger");

async function getSuccessPaymentPage(page, isSubscription) {
  try {
    if (isSubscription) {
      await getSummaryAmountForSubscriptionPay(page);
    } else {
      await getSummaryAmountForOnePayCheckout(page);
    }
  } catch (e) {
    throw new Error("Error at getting payment success page" + e);
  }
}

async function getSummaryAmountForSubscriptionPay(page) {
  const targetPage = page;
  const timeout = 40000;

  await puppeteer.Locator.race([
    targetPage.locator("::-p-aria(Te suscribiste exitosamente)"),
    targetPage.locator("[data-testid='SuccesPayment-title']"),
    targetPage.locator(
      '::-p-xpath(//*[@data-testid=\\"SuccesPayment-title\\"])'
    ),
    targetPage.locator(":scope >>> [data-testid='SuccesPayment-title']"),
    targetPage.locator("::-p-text(Te suscribiste)"),
  ])
    .setTimeout(timeout)
    .click({
      count: 2,
      offset: {
        x: 185.5,
        y: 15,
      },
    });
}
async function getSummaryAmountForOnePayCheckout(page) {
  const targetPage = page;
  const timeout = 10000;

  await puppeteer.Locator.race([
    targetPage.locator("::-p-aria(¡Pago exitoso!)"),
    targetPage.locator("[data-testid='SuccesPayment-title']"),
    targetPage.locator(
      '::-p-xpath(//*[@data-testid=\\"SuccesPayment-title\\"])'
    ),
    targetPage.locator(":scope >>> [data-testid='SuccesPayment-title']"),
    targetPage.locator("::-p-text(¡Pago exitoso!)"),
  ])
    .setTimeout(timeout)
    .click({
      count: 2,
      offset: {
        x: 173.5,
        y: 20,
      },
    });
}

module.exports = { getSuccessPaymentPage };
