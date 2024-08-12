const puppeteer = require('puppeteer')


async function pageClientInitialize() {
const timeout = 15000;
/*Add MAXIMIZE  args: ['--start-maximized']  */
const browser = await puppeteer.launch({headless:false, waitUntil: 'networkidle0',})
const [page] = await browser.pages();
await page.setViewport({ width: 1280, height: 1080 }); 

page.setDefaultTimeout(timeout);

return page;
}

module.exports = { pageClientInitialize }