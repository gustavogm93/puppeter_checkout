const puppeteer = require("puppeteer"); // v22.0.0 or later

async function generateSubscription(page, data) {
  try {
    const { name, email, phone } = data;
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
      const targetPage = page;
      await targetPage.setViewport({
        width: 1087,
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
        "https://dev-pago.payclip.com/suscripcion/6a053611-4c48-40e7-a65e-c1f8174ff194"
      );
      await Promise.all(promises);
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Nombre)"),
        targetPage.locator("[data-testid='FormSubscription-inputName']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputName\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputName']"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 90.5,
            y: 34,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Nombre)"),
        targetPage.locator("[data-testid='FormSubscription-inputName']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputName\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputName']"
        ),
      ])
        .setTimeout(timeout)
        .fill(name);
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Correo electrónico)"),
        targetPage.locator("[data-testid='FormSubscription-inputEmail']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputEmail\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputEmail']"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 82.5,
            y: 30.875,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Correo electrónico)"),
        targetPage.locator("[data-testid='FormSubscription-inputEmail']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputEmail\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputEmail']"
        ),
      ])
        .setTimeout(timeout)
        .fill(email);
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Celular)"),
        targetPage.locator("[data-testid='FormSubscription-inputPhone']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputPhone\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputPhone']"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 63.5,
            y: 34.75,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Celular)"),
        targetPage.locator("[data-testid='FormSubscription-inputPhone']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-inputPhone\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='FormSubscription-inputPhone']"
        ),
      ])
        .setTimeout(timeout)
        .fill(phone);
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("#__next"),
        targetPage.locator('::-p-xpath(//*[@id=\\"__next\\"])'),
        targetPage.locator(":scope >>> #__next"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 185,
            y: 790,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("[data-testid='PeriodSelector-labelInput']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"PeriodSelector-labelInput\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='PeriodSelector-labelInput']"
        ),
        targetPage.locator("::-p-text(Periodo de inicio)"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 35.5,
            y: 1.125,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator(
          "[data-testid='PeriodSelector-radioList-option-current']"
        ),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"PeriodSelector-radioList-option-current\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='PeriodSelector-radioList-option-current']"
        ),
        targetPage.locator("::-p-text(01 Ago 2024 -)"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 4.5,
            y: 3.5,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("[data-testid='swipeableDrawer-btnClose']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"swipeableDrawer-btnClose\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='swipeableDrawer-btnClose']"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 10.5,
            y: 10.5,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("div.FormSubscription_containerTerms__DPR_c input"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"FormSubscription-checkbox\\"]/input)'
        ),
        targetPage.locator(
          ":scope >>> div.FormSubscription_containerTerms__DPR_c input"
        ),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 10.5,
            y: 13.625,
          },
        });
    }
    {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator(
          '::-p-aria(Suscribirme y pagar) >>>> ::-p-aria([role=\\"paragraph\\"])'
        ),
        targetPage.locator("div.SummarySubscription_containerCta__MEH_z p"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"SubscriptionButton-cta\\"]/p)'
        ),
        targetPage.locator(
          ":scope >>> div.SummarySubscription_containerCta__MEH_z p"
        ),
        targetPage.locator("::-p-text(Suscribirme y)"),
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 16.984375,
            y: 6.625,
          },
        });
    }

    await browser.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
