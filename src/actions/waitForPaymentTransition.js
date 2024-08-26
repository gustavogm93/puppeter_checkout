async function waitForPaymentTransition(page, isSubscription) {
  const timeout = 15000;
  const subscriptionSelector = '[data-testid="DetailSubscription-amount"]';
  const onePaySelector = '[data-testid="SuccesPayment-decimal"]';
  const selector = isSubscription ? subscriptionSelector : onePaySelector;
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (e) {
    throw new Error("Failed to get into payment transition page" + e);
  }
}

module.exports = { waitForPaymentTransition };
