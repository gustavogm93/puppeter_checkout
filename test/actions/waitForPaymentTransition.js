async function waitForPaymentTransition(page) {
  const timeout = 20000;
  try {
    const selector = '[data-testid="SuccesPayment-decimal"]';
    await page.waitForSelector(selector, { timeout });
  } catch (e) {
    await page.waitForSelector(selector, { timeout });
  }
}

module.exports = { waitForPaymentTransition };
