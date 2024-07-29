
const puppeteer = require('puppeteer')

//Check if the amount is correct.
//Check if the title is correct
async function checkElementsInLoadingTransition(page, amount) {
    const timeout = 6000  
    const selector = '[data-testid="DetailSubscription-amount"]';
    const expectedText = amount;    
   try {
   
        const elementExistsWithText = await page.waitForFunction(
            (selector, expectedText) => {
                const element = document.querySelector(selector);
                expect(element).toContain('google')

                return element && element.textContent.trim() === expectedText;
            },
            { timeout },
            selector,
            expectedText
        );
        if(elementExistsWithText) {
            expect(text).toContain('google')
        } {
            throw new Error(`Element ${selector} with text "${expectedText}" was not found.`);
        }

} catch (e) {
    console.error(e);
    await browser.close();
}
}

module.exports = { checkElementsInLoadingTransition }