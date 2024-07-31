
async function waitForPaymentTransition(page) {
try {
    const selector = '[data-testid="SuccesPayment-decimal"]';
    await page.waitForSelector(selector, { timeout: 20000 }); 
} catch (e) {

}  
}

module.exports = { waitForPaymentTransition }