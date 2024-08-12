const puppeteer = require("puppeteer"); // v22.0.0 or later

function a() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
      const targetPage = page;
      await targetPage.setViewport({
        width: 1123,
        height: 829,
      });
    }
    {
      const targetPage = page;
      const promises = [];
      const startWaitingForEvents = () => {
        promises.push(targetPage.waitForNavigation());
      };
      startWaitingForEvents();
      await targetPage.goto(
        "https://dev-pago.payclip.com/ece95f9a-0cb9-4c2d-b62e-a9d44590b156"
      );
      await Promise.all(promises);
    }

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
        .fill("4037 0702          ");
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

    //Click on show installments options
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("[data-testid='installments-input'] > div"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"installments-input\\"]/div)'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='installments-input'] > div"
        ),
      ])
        .setTimeout(timeout)
        .click();
    }
    //Click on show installments options
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(6 x $97.27 \\(+$63.60\\)$583.60)"),
        targetPage.locator("label:nth-of-type(2) input"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"installmentsList-radioList-mci\\"]/label[2]/span[1]/input)'
        ),
        targetPage.locator(":scope >>> label:nth-of-type(2) input"),
      ])
        .setTimeout(timeout)
        .click();
    }

    await browser.close();
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

a();
