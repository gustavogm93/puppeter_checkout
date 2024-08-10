async function waitForPaymentTransition(page) {
  const timeout = 20000;
  const selector = '[data-testid="SuccesPayment-decimal"]';
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (e) {
    await page.waitForSelector(selector, { timeout });
  }
}

module.exports = { waitForPaymentTransition };
