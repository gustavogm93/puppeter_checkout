

const puppeteer = require('puppeteer')

 async function fillEmail(page, email) {
    const timeout = 18000     
    const targetPage = page;
 
    try {
    {
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Correo)'),
            targetPage.locator("[data-testid='contactDetailsForm-buyerEmail']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerEmail\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerEmail']")
        ])
            .setTimeout(timeout)
            .fill(email);
    }
    {
        await targetPage.keyboard.up('V');
    }
} catch (e) {
    console.error(e);
    await browser.close();
}
}
module.exports = { fillEmail }