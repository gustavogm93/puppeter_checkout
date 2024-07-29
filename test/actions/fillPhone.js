
const puppeteer = require('puppeteer')

async function fillPhone(page, phone) {
    const timeout = 18000      
   try {

   
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator("[data-testid='contactDetailsForm-wrap']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-wrap\\"])'),
        targetPage.locator(":scope >>> [data-testid='contactDetailsForm-wrap']"),
        targetPage.locator('::-p-text(Datos de contactoCorreofejaro1150@orsbap.com🇲🇽+52)')
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 9.5,
            y: 166,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator("[data-testid='contactDetailsForm-buyerMobile']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerMobile\\"])'),
        targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerMobile']")
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 127.5,
            y: 31.875,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator("[data-testid='contactDetailsForm-buyerMobile']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerMobile\\"])'),
        targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerMobile']")
    ])
        .setTimeout(timeout)
        .fill(phone);
}
} catch (e) {
    console.error(e);
    await browser.close();
}
}

module.exports = { fillPhone }