
async function waitForPaymentTransition(page) {
    const timeout = 18000
try {
    const selector = '[data-testid="SuccesPayment-decimal"]';
    await page.waitForSelector(selector, { timeout }); 
} catch (e) {

}  
}

module.exports = { waitForPaymentTransition }