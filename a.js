const puppeteer = require("puppeteer"); // v22.0.0 or later

function a() {
  (async () => {
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      const timeout = 5000;
      page.setDefaultTimeout(timeout);

      {
        try {
          const targetPage = page;
          await targetPage.setViewport({
            width: 1123,
            height: 829,
          });
        } catch (error) {
          console.error("Error setting viewport:", error);
        }
      }

      {
        try {
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
        } catch (error) {
          console.error("Error navigating to URL:", error);
        }
      }

      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
            targetPage.locator("div.CardHolderForm_cardNumber__a3VAF"),
            targetPage.locator(
              '::-p-xpath(//*[@data-testid=\\"cardHolderForm-wrap\\"]/div/div[1])'
            ),
            targetPage.locator(
              ":scope >>> div.CardHolderForm_cardNumber__a3VAF"
            ),
          ])
            .setTimeout(timeout)
            .click();
        } catch (error) {
          console.error("Error interacting with card number:", error);
        }
      }

      //[Fill Card number]
      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
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
        } catch (error) {
          console.error("Error filling card number:", error);
        }
      }

      //[Fill Expiration date]
      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
            targetPage.locator("::-p-aria(MM/AA)"),
            targetPage.locator(
              "[data-testid='cardHolderForm-cardExpirationDate']"
            ),
            targetPage.locator(
              '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'
            ),
            targetPage.locator(
              ":scope >>> [data-testid='cardHolderForm-cardExpirationDate']"
            ),
          ])
            .setTimeout(timeout)
            .fill("12/33");
        } catch (error) {
          console.error("Error filling expiration date:", error);
        }
      }

      //[Fill CVV]
      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
            targetPage.locator("::-p-aria(CVV)"),
            targetPage.locator("[data-testid='cardHolderForm-cardCVV']"),
            targetPage.locator(
              '::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardCVV\\"])'
            ),
            targetPage.locator(
              ":scope >>> [data-testid='cardHolderForm-cardCVV']"
            ),
          ])
            .setTimeout(timeout)
            .fill("457");
        } catch (error) {
          console.error("Error filling CVV:", error);
        }
      }

      //[Fill Name]
      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
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
        } catch (error) {
          console.error("Error filling name:", error);
        }
      }

      //Click on show installments options
      {
        try {
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
        } catch (error) {
          console.error("Error showing installments options:", error);
        }
      }

      //Click on specific installment option
      {
        try {
          const targetPage = page;
          await puppeteer.Locator.race([
            targetPage.locator("::-p-aria(6 x $97.27 \\(+$63.60\\)$583.60)"),
            targetPage.locator("label:nth-of-type(12) input"),
            targetPage.locator(
              '::-p-xpath(//*[@data-testid=\\"installmentsList-radioList-mci\\"]/label[12]/span[1]/input)'
            ),
            targetPage.locator(":scope >>> label:nth-of-type(12) input"),
          ])
            .setTimeout(timeout)
            .click();
        } catch (error) {
          console.error("Error selecting installment option:", error);
        }
      }

      await browser.close();
    } catch (error) {
      console.error("General error:", error);
      if (browser) {
        await browser.close();
      }
    }
  })().catch((err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
  });
}

a();
