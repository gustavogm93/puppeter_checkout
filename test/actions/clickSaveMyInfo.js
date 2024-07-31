const puppeteer = require("puppeteer");

async function clickSaveMyInfo(page) {
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator(
        '::-p-aria([role=\\"main\\"]) >>>> ::-p-aria([role=\\"checkbox\\"])'
      ),
      targetPage.locator("[data-testid='SaveCardInfo-wrap'] input"),
      targetPage.locator(
        '::-p-xpath(//*[@data-testid=\\"SaveCardInfo-buyerMemorizeData\\"]/input)'
      ),
      targetPage.locator(":scope >>> [data-testid='SaveCardInfo-wrap'] input"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 9,
          y: 10.5,
        },
      });
  }
}

module.exports = { clickSaveMyInfo };
