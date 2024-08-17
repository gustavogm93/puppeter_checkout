const puppeteer = require("puppeteer");
const mlog = require("mocha-logger");
async function fillEmail(page, email) {
  const timeout = 18000;
  const targetPage = page;
  //Put a set timeout of 10 seconds and then wait for it

  try {
    {
      await puppeteer.Locator.race([
        targetPage.locator("::-p-aria(Correo)"),
        targetPage.locator("[data-testid='contactDetailsForm-buyerEmail']"),
        targetPage.locator(
          '::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerEmail\\"])'
        ),
        targetPage.locator(
          ":scope >>> [data-testid='contactDetailsForm-buyerEmail']"
        ),
      ])
        .setTimeout(timeout)
        .fill(email);
    }
    {
      await targetPage.keyboard.up("V");
      mlog.error("TERMINO INTERNO email------------------------ ");
    }
  } catch (e) {
    console.error(e);
  }
}
module.exports = { fillEmail };
