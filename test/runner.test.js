const puppeteer = require('puppeteer')
const {fillEmail} = require('./actions/fillEmail.js');
const {fillPhone} = require('./actions/fillPhone.js');
const {fillCard} = require('./actions/fillCard.js');
const {checkElementsInLoadingTransition} = require('./actions/checkElementsInLoadingTransition.js');
const {  writeFile, createDirectory, prependToFile} = require('../utils/fs_utils.js')
const {generateSheet} = require('../excel.js');
const mlog = require('mocha-logger');
const path = require('path');
const { Cluster } = require('puppeteer-cluster');
const { takeScreenshotAndSave } = require('./image/takeScreenshot.js')
const { formatRequestLogs2 } = require('../utils/formatRequestLogs.js');

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

    const cards = getCard();
    const log = "";
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 8,
    });
    //p.test_case_id, p.card, p.amount, p.email, p.phone, p.payment_request_id, p.payment_flow_type, p.payment_request_type,p.test_run_id, p.baseDir
    await cluster.task(async ({ page, data: [test_case_id, card, email, phone, payment_request_id, payment_flow_type, payment_request_type, test_run_id, baseDir, request_log_list, i] }) => {
      mlog.log("----------------------------------------------------------------")
      mlog.log("       values                                                   ")

      mlog.log("test_case_id:", test_case_id)
      mlog.log("card:", card)
      mlog.log("email:", email)
      mlog.log("phone:", phone)
      mlog.log("payment_request_id:", payment_request_id)
      mlog.log("payment_flow_type:", payment_flow_type)
      mlog.log("test_run_id:", test_run_id)
      mlog.log("baseDir:", baseDir)

      mlog.log("----------------------------------------------------------------")

      mlog.log("----------------------------------------------------------------")
      mlog.log("                   generating directory...                      ")
      mlog.log("----------------------------------------------------------------")
      //i less than 4
     if(i < 4)
     createDirectory(`completed_tests/test_runs/${test_run_id}`, test_case_id);


      await page.setViewport({ width: 1280, height: 1080 });
      await page.setRequestInterception(true)




      page.setDefaultTimeout(timeout);
      
      const targetPage = page

      targetPage.on('request', (request) => {
        // if (request.resourceType() === 'image') request.abort()
    
         if(request?.url() && request?.url().startsWith("https://dev-pago.payclip.com/api/")) {
            // mlog.log("--------------------------REQUEST 1111111111:  " + request.url() + "-------------------------------------");
            // mlog.log("Request URL:", request.url());
            // mlog.log("Request headers:", JSON.stringify(request.headers()));
            // mlog.log("Request postData:", request.postData());
            // mlog.log("----------------------------REQUEST   ------------------------------------");
            // mlog.log("-------------------REQUEST URL:" + request.url() + "--------------------------------");
            // mlog.log(request.url());
            // mlog.log("\n");
            // mlog.log("-------------------REQUEST HEADERS --------------------------------");
            // mlog.log(request.headers());
            // mlog.log("\n");
            // mlog.log("-------------------REQUEST ALL --------------------------------");
            // mlog.log(JSON.stringify(request));
            // mlog.log("-------------------REQUEST ALL --------------------------------");
         }
         request.continue();
    });
    
    targetPage.on('response', async (response) => {
      const request = response.request();
      if(request?.url() && request?.url()?.startsWith("https://dev-pago.payclip.com/api/")) {
        mlog.error("llego aca");
        const statusCode = await response?.status();
        const responseJson = await response?.json();
        mlog.error("llego aca2");
        const request_log = {
          url: request.url(),
          headers: JSON.stringify(request.headers()),
          payload: request.postData(),
          statusCode: statusCode,
          response: responseJson,
          timestamp: new Date().toISOString(),
        };
        request_log_list.push(request_log)
        
      }
    });

      const startWaitingForEvents = () => {
       promises.push(targetPage.waitForNavigation());
       }
       const promises = [];
       startWaitingForEvents();
       await targetPage.goto(`https://dev-pago.payclip.com/${payment_request_id}`);
       await Promise.all(promises);
  
       //get amount:
  
       let displayed_amount = await targetPage.$eval("#__next > div.FormPayment_wrapFormPaymentDesktop__bnw2T > div.FormPayment_wrapOrderSummaryColum__ZGvRp > div.OrderSummary_wrapOrderSummary__gt6O5.OrderSummary_desktopStyles__j_lTJ > section.Breakdown_breakdownSection__CVqET.Breakdown_grayLight__hNAYk > section > div.Breakdown_totalRow__ED57c > span.text_span__Q4eOL.text_left__ZQekq.text_semibold__nVajh.text_xxs__x8CSG.text_surface950__Ebmcu > span", el => el.textContent);
       
  
       //INTERACTIONS:::
  
       {
            await targetPage.keyboard.down('Meta');
        }
        {
            await targetPage.keyboard.up('Meta');
        }
        {   
          mlog.log("----------------------------------------------------------------")
          mlog.log("       Fill email: " + test_case_id)
          mlog.log("----------------------------------------------------------------")
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

            mlog.log("----------------------------------------------------------------")
            mlog.log("       Save screenshot for form page fill: " + test_case_id)
            mlog.log("----------------------------------------------------------------")
          //Save Checkout Form in screenshot
          const pathImageForFormPage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/form-page-fill.png`
          await takeScreenshotAndSave(pathImageForFormPage, targetPage, baseDir)

  
  
      }   

            //Click in Pay

            // await puppeteer.Locator.race([
            //     targetPage.locator('::-p-aria(clip)'),
            //     targetPage.locator("[data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"),
            //     targetPage.locator('::-p-xpath(//*[@data-testid=\\"paymentButton-ctaPrincipal\\"]/span[1]/img)'),
            //     targetPage.locator(":scope >>> [data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img")
            // ])
            //     .setTimeout(timeout)
            //     .click({
            //       offset: {
            //         x: 11.1875,
            //         y: 5,
            //       },
            //     });
        }
        {
          //Wait for Loading transition page

            try {
                 const selector = '[data-testid="SuccesPayment-decimal"]';
                 await page.waitForSelector(selector, { timeout: 999999 }); 
          } catch (e) {
            await page.waitForSelector(selector, { timeout: 999999 });
             console.error(e, "--------------------------------");
             await browser.close();
         }     
       }
  
      {

        mlog.log("----------------------------------------------------------------")
        mlog.log("       Save screenshot for success pay page: " + test_case_id)
        mlog.log("----------------------------------------------------------------")


        //Save Success Page in screenshot
        const pathImageForSuccessPayPage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/success-pay-page.png`
        await takeScreenshotAndSave(pathImageForSuccessPayPage, targetPage, baseDir)
      const status = "OK";
      const result_test_case = [test_case_id,card,email, phone, payment_request_id, payment_flow_type, displayed_amount,payment_request_type, "", status];

      results_run.push(result_test_case);
      if(results_run.length > 3) {
      generateSheet(results_run, `/completed_tests/test_runs/${test_run_id}/${test_run_id}`);
      }
      const path_logs =  path.join(baseDir, `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/logs.txt`);
    
      writeFile(path_logs, formatRequestLogs2(request_log_list));

      await browser.close();
    }
    });
    
    const parameters = [];
const baseDir = process.cwd();
createDirectory("completed_tests/test_runs", test_run_id);
for (let i = 0; i < 2; i++) {
// const prs = ["bdb2522e-8955-4c41-8b6a-bef29f9b55da",
// "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
// "1ff71e00-dc73-4dd6-a01c-f63887a95542",
// "1ff71e00-dc73-4dd6-a01c-f63887a95542",
// ]
const prs = [  "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
  "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
  "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
  "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
  ]
const value = { test_case_id: generateTestCaseId(i),
  card: "5215956400364553",//cards[i],
 email: generateRandomEmail(),
 phone: "1234567891",
 payment_request_id: prs[i],
 payment_flow_type: "GUEST",
 payment_request_type: "HX",
 test_run_id: test_run_id,
 baseDir: baseDir,
 request_log_list: [],
 i:i,
 }
 parameters.push(value);
}


parameters.map((p)=>{
    cluster.execute([p.test_case_id, p.card, p.email, p.phone, p.payment_request_id, p.payment_flow_type, p.payment_request_type,p.test_run_id, p.baseDir, p.request_log_list, p.i]);
})


    await cluster.idle();
    await cluster.close();
  
      


     });
     
     
});