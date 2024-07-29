
const puppeteer = require('puppeteer')

async function fillCard(page, card) {
    const timeout = 18000      
   try {

{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator("[data-testid='switchCardCash-wrap']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"switchCardCash-wrap\\"])'),
        targetPage.locator(":scope >>> [data-testid='switchCardCash-wrap']"),
        targetPage.locator('::-p-text(Selecciona tu método de pagoNuevo)')
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 1.5,
            y: 20.875,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(Número de tarjeta)'),
        targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 43.5,
            y: 36.875,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('#__next'),
        targetPage.locator('::-p-xpath(//*[@id=\\"__next\\"])'),
        targetPage.locator(':scope >>> #__next')
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 112,
            y: 535,
          },
        });
}
{
    const targetPage = page;
    await targetPage.keyboard.down('Meta');
}
{
    const targetPage = page;
    await targetPage.keyboard.up('Meta');
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(Número de tarjeta)'),
        targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 112.5,
            y: 26.875,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(Número de tarjeta)'),
        targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
    ])
        .setTimeout(timeout)
        .fill(card);
}
{
    const targetPage = page;
    await targetPage.keyboard.up('V');
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('#__next'),
        targetPage.locator('::-p-xpath(//*[@id=\\"__next\\"])'),
        targetPage.locator(':scope >>> #__next')
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 75,
            y: 564,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(MM/AA)'),
        targetPage.locator("[data-testid='cardHolderForm-cardExpirationDate']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardExpirationDate']")
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 40.5,
            y: 50.75,
          },
        });
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(MM/AA)'),
        targetPage.locator("[data-testid='cardHolderForm-cardExpirationDate']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardExpirationDate']")
    ])
        .setTimeout(timeout)
        .fill('03/44');
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(CVV)'),
        targetPage.locator("[data-testid='cardHolderForm-cardCVV']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardCVV\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardCVV']")
    ])
        .setTimeout(timeout)
        .fill('345');
}
{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(Nombre en la tarjeta)'),
        targetPage.locator("[data-testid='cardHolderForm-cardName']"),
        targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardName\\"])'),
        targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardName']")
    ])
        .setTimeout(timeout)
        .fill('Gustavo Garcia');
}
} catch (e) {
    console.error(e);
    await browser.close();
}
}

module.exports = { fillCard }