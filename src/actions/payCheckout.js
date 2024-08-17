const puppeteer = require("puppeteer");

async function payCheckout(page, i) {
  const timeout = 20000;
  await puppeteer.Locator.race([
    page.locator("::-p-aria(clip)"),
    page.locator(
      "[data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"
    ),
    page.locator(
      '::-p-xpath(//*[@data-testid=\\"paymentButton-ctaPrincipal\\"]/span[1]/img)'
    ),
    page.locator(
      ":scope >>> [data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"
    ),
  ])
    .setTimeout(timeout)
    .click({
      offset: {
        x: 11.1875,
        y: 5,
      },
    });
}

module.exports = { payCheckout };
