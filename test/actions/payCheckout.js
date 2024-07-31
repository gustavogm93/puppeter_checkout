
const puppeteer = require('puppeteer')

async function payCheckout() {
    
    await puppeteer.Locator.race([
    targetPage.locator('::-p-aria(clip)'),
    targetPage.locator("[data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"),
    targetPage.locator('::-p-xpath(//*[@data-testid=\\"paymentButton-ctaPrincipal\\"]/span[1]/img)'),
    targetPage.locator(":scope >>> [data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img")
])
    .setTimeout(timeout)
    .click({
      offset: {
        x: 11.1875,
        y: 5,
      },
    });
}

module.exports = {payCheckout}