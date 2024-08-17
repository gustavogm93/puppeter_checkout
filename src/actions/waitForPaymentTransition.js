async function waitForPaymentTransition(page) {
  const timeout = 20000;
  const selector = '[data-testid="SuccesPayment-decimal"]';
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (e) {
    throw new Error("Failed to get into payment transition page");
  }
}

module.exports = { waitForPaymentTransition };
