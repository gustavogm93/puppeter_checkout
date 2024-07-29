const puppeteer = require('puppeteer')
const {fillEmail} = require('./actions/fillEmail.js');
const {fillPhone} = require('./actions/fillPhone.js');
const {fillCard} = require('./actions/fillCard.js');
const {checkElementsInLoadingTransition} = require('./actions/checkElementsInLoadingTransition.js');
const { writeFile, createDirectory} = require('../utils/fs_utils.js')
const {generateSheet} = require('../excel.js');
const mlog = require('mocha-logger');
const path = require('path');
const { Cluster } = require('puppeteer-cluster');

const { getCard, generateRandomEmail, getPaymentRequestId, generateTestCaseId, generateTestRunId } = require('../data_sample.js');
/* const {expect} = require("chai");
 */
describe("One Click",()=>{
     it("Pay",async()=>{
    const timeout = 15000;

    const results_run = [];
    //generate random int from 0 - 10000
    let i = 0;
    const test_run_id = generateTestRunId();


    //For Each case run browser
    const test_case_id = generateTestCaseId(i);
    const cards = getCard();
    const card = cards[0];
    const email = generateRandomEmail();
    const phone = "1234567891"
    const payment_request_id = getPaymentRequestId();
    const payment_flow_type = "GUEST";
    const payment_request_type = "HX";
    let status = "";

    createDirectory("completed_tests/test_runs", test_run_id);
    createDirectory(`completed_tests/test_runs/${test_run_id}`, test_case_id);

    const browser = await puppeteer.launch({headless:false, waitUntil: 'networkidle0',      /* MAXIMIZE  args: ['--start-maximized']  */
    })
    const [page] = await browser.pages();
   await page.setViewport({ width: 1280, height: 1080 });
   
  
    const amount = "4.50"

    page.setDefaultTimeout(timeout);
    
    const targetPage = page
    const startWaitingForEvents = () => {
     promises.push(targetPage.waitForNavigation());
     }
     const promises = [];
     startWaitingForEvents();
     await targetPage.goto(`https://dev-pago.payclip.com/${payment_request_id}`);
     await Promise.all(promises);

     //get amount:

     let displayed_amount = await targetPage.$eval("#__next > div.FormPayment_wrapFormPaymentDesktop__bnw2T > div.FormPayment_wrapOrderSummaryColum__ZGvRp > div.OrderSummary_wrapOrderSummary__gt6O5.OrderSummary_desktopStyles__j_lTJ > section.Breakdown_breakdownSection__CVqET.Breakdown_grayLight__hNAYk > section > div.Breakdown_totalRow__ED57c > span.text_span__Q4eOL.text_left__ZQekq.text_semibold__nVajh.text_xxs__x8CSG.text_surface950__Ebmcu > span", el => el.textContent);
     console.log(displayed_amount, "------displayed_amount------");
     

     //INTERACTIONS:::

     {
          await targetPage.keyboard.down('Meta');
      }
      {
          await targetPage.keyboard.up('Meta');
      }
      {   
          await fillEmail(targetPage, email);
      }
      {   
          await fillPhone(targetPage, phone)
      }
      {
          await fillCard(targetPage, card)
      }
      {
        const targetPage = page;

        {
        //Save Checkout Form in screenshot
        try {
          const baseDir = process.cwd();
          const pathImage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/form-page-fill.png`
          const buffer = await targetPage.screenshot({
          path: pathImage,
          fullPage: true
        });
        mlog.error(baseDir);
        const filePath = path.join(baseDir, pathImage.indexOf(1));
        mlog.error(filePath);

        writeFile(filePath, buffer)
      } catch(e) {
        mlog.error(e + "Cannot save screenshot");
      }

    }
          //Click in Pay
 
          await puppeteer.Locator.race([
              targetPage.locator('::-p-aria(clip)'),
              targetPage.locator("[data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"),
              targetPage.locator('::-p-xpath(//*[@data-testid=\\"paymentButton-ctaPrincipal\\"]/span[1]/img)'),
              targetPage.locator(":scope >>> [data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img")
          ])
              .setTimeout(timeout)
              .click({
                offset: {
                  x: 11.1875,
                  y: 5,
                },
              });
      }
      {
          /* checkElementsInLoadingTransition(targetPage, amount) */

          try {
               const selector = '[data-testid="SuccesPayment-decimal"]';
               const expectedText = amount;    

               await page.waitForSelector(selector, { timeout: 60000 }); // 10 seconds timeout
               const got_amount = await page.$eval('[data-testid="SuccesPayment-amount"]', el => el.textContent); 

/*                assert(got_amount, expectedText, "Expected amount to be " + got_amount);
 */       } catch (e) {
           console.error(e, "--------------------------------");
           await browser.close();
       }     
     }

    {
      //Save Success Page in screenshot
      try {


        const baseDir = process.cwd();
        const pathImage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/success-pay-page.png`

      const buffer = await targetPage.screenshot({
        path: pathImage,
        fullPage: true
      });
      const filePath = path.join(baseDir, pathImage);

      writeFile(filePath, buffer)
    } catch(e) {
      mlog.error(e + "Cannot save screenshot");
    }

    status = "OK";
    const result_test_case = [test_case_id,card,email, phone, payment_request_id, payment_flow_type, amount,payment_request_type, "", status];
    results_run.push(result_test_case);

    //fs create directory in ../completed_tests/test_runs/ called with the name of test_run_id


    generateSheet(results_run, `/completed_tests/test_runs/${test_run_id}/${test_run_id}`);
     //write ecel 
  }
      await browser.close();


     });
     
});