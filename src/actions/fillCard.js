const puppeteer = require("puppeteer");

async function fillCard(page, card) {
  const timeout = 18000;
  try {
    // {
    //   const targetPage = page;
    //   const promises = [];
    //   const startWaitingForEvents = () => {
    //     promises.push(targetPage.waitForNavigation());
    //   };
    //   startWaitingForEvents();
    //   //   await targetPage.goto(
    //   //     "https://stage-pago.payclip.com/aa5ea058-e9a5-44bf-bfc5-b03221a64cc7"
    //   //   );
    //   await Promise.all(promises);
    // }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("div.CardHolderForm_cardNumber__a3VAF"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"cardHolderForm-wrap\\"]/div/div[1])'
        ),
        targetPage.locator(":scope >>> div.CardHolderForm_cardNumber__a3VAF"),
      ])
        .setTimeout(timeout)
        .click();
    }
    //[Fill Card number]
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        // targetPage.locator('::-p-aria(Card number)'),
        targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='cardHolderForm-cardNumber']"
        ),
      ])
        .setTimeout(timeout)
        .fill(card);
    }
    //[Fill Expiration date]
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(MM/AA)"),
        targetPage.locator("[data-testid='cardHolderForm-cardExpirationDate']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='cardHolderForm-cardExpirationDate']"
        ),
      ])
        .setTimeout(timeout)
        .fill("12/33");
    }
    //[Fill CVV]
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(CVV)"),
        targetPage.locator("[data-testid='cardHolderForm-cardCVV']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardCVV\\"])'
        ),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardCVV']"),
      ])
        .setTimeout(timeout)
        .fill("457");
    }

    //[Fill Name]
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        // targetPage.locator("::-p-aria(Nombre en la tarjeta)"),
        targetPage.locator("[data-testid='cardHolderForm-cardName']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardName\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='cardHolderForm-cardName']"
        ),
      ])
        .setTimeout(timeout)
        .fill("Gustavo Garcia");
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = { fillCard };
