async function waitForPaymentTransition(page, isSubscription, is3DS) {
  const timeoutWithout3ds = 15000;
  const timeoutWith3ds = 45000;
  const firstTimeout = is3DS ? timeoutWith3ds : timeoutWithout3ds
  const timeouts = [firstTimeout, 3000, 1000];
  const subscriptionSelector = '[data-testid="DetailSubscription-amount"]';
  const onePaySelector = '[data-testid="SuccesPayment-decimal"]';
  const selector = isSubscription ? subscriptionSelector : onePaySelector;

  for (let attempt = 0; attempt < timeouts.length; attempt++) {
    try {
      await page.waitForSelector(selector, { timeout: timeouts[attempt] });
      return;
    } catch (e) {
      if (attempt === timeouts.length - 1) {
        throw new Error(
          "Failed to get into payment transition page after maximum retries: " +
            e
        );
      }

      // await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
}

module.exports = { waitForPaymentTransition };
