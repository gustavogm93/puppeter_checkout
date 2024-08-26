const puppeteer = require("puppeteer"); // v22.0.0 or later

async function run() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
      const targetPage = page;
      await targetPage.setViewport({
        width: 1044,
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
        "https://dev-pago.payclip.com/9131e884-faf2-4416-ad26-4e29a8a8a0fd"
      );
      await Promise.all(promises);
    }
    {
      const element = await page.$('[data-test-id="breakdown-total-amount"]');
      console.log(
        await element.evaluate((x) => x.textContent),
        "QUE DAAAA------"
      );

      //data-testid="LegendGetOptionsDcc-wrap"

      const targetPage = page;
      const amount = puppeteer.Locator.race([
        targetPage.locator(
          "[data-testid='breakdown-section'] > section span.text_xxs__x8CSG"
        ),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"breakdown-section\\"]/section/div[2]/span[2])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='breakdown-section'] > section span.text_xxs__x8CSG"
        ),
      ]).setTimeout(timeout);

      console.log(amount);
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator(
          "[data-testid='breakdown-section'] > section span.text_xxs__x8CSG"
        ),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"breakdown-section\\"]/section/div[2]/span[2])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='breakdown-section'] > section span.text_xxs__x8CSG"
        ),
      ])
        .setTimeout(timeout)
        .click({
          count: 2,
          offset: {
            x: 8.609375,
            y: 16,
          },
        });
    }

    await browser.close();
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
run();
