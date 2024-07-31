// const puppeteer = require("puppeteer");
// const { Cluster } = require("puppeteer-cluster");
// const mlog = require("mocha-logger");
// const path = require("path");

// const {
//   fillEmail,
//   fillPhone,
//   fillCard,
//   payCheckout,
//   waitForPaymentTransition,
// } = require("./actions");
// const {
//   writeFile,
//   createDirectory,
//   prependToFile,
// } = require("../utils/fs_utils");
// const { generateSheet } = require("../excel");
// const { takeScreenshotAndSave } = require("./image/takeScreenshot");
// const { formatRequestLogs } = require("../utils/formatRequestLogs");
// const {
//   getCard,
//   generateRandomEmail,
//   getPaymentRequestId,
//   generateTestCaseId,
//   generateTestRunId,
// } = require("../data_sample");

// const TIMEOUT = 15000;
// const BASE_DIR = process.cwd();
// const MAX_CONCURRENCY = 8;
// const MAX_RUNS = 2;

// const initializeCluster = async () => {
//   return await Cluster.launch({
//     concurrency: Cluster.CONCURRENCY_CONTEXT,
//     maxConcurrency: MAX_CONCURRENCY,
//   });
// };

// const handleRequest = async (targetPage, request, request_log_list) => {
//   if (request.url().startsWith("https://dev-pago.payclip.com/api/")) {
//     request.continue();
//   } else {
//     request.continue();
//   }
// };

// const handleResponse = async (response, request_log_list) => {
//   const request = response.request();
//   if (request.url().startsWith("https://dev-pago.payclip.com/api/")) {
//     const statusCode = await response.status();
//     const responseJson = await response.json();
//     request_log_list.push({
//       url: request.url(),
//       headers: JSON.stringify(request.headers()),
//       payload: request.postData(),
//       statusCode,
//       response: responseJson,
//       timestamp: new Date().toISOString(),
//     });
//   }
// };

// const performTest = async ({
//   page,
//   data: [
//     test_case_id,
//     card,
//     email,
//     phone,
//     payment_request_id,
//     payment_flow_type,
//     payment_request_type,
//     test_run_id,
//     baseDir,
//     request_log_list,
//     i,
//   ],
// }) => {
//   mlog.log("----------------------------------------------------------------");
//   mlog.log("                           Parameters                         ");
//   mlog.log("----------------------------------------------------------------");
//   mlog.log("test_case_id:", test_case_id);
//   mlog.log("card:", card);
//   mlog.log("email:", email);
//   mlog.log("phone:", phone);
//   mlog.log("payment_request_id:", payment_request_id);
//   mlog.log("payment_flow_type:", payment_flow_type);
//   mlog.log("test_run_id:", test_run_id);
//   mlog.log("baseDir:", baseDir);
//   mlog.log("----------------------------------------------------------------");

//   if (i < 4)
//     createDirectory(`completed_tests/test_runs/${test_run_id}`, test_case_id);

//   await page.setViewport({ width: 1280, height: 1080 });
//   await page.setRequestInterception(true);

//   page.setDefaultTimeout(TIMEOUT);

//   page.on("request", (request) =>
//     handleRequest(page, request, request_log_list)
//   );
//   page.on("response", (response) => handleResponse(response, request_log_list));

//   const startWaitingForEvents = () => {
//     promises.push(page.waitForNavigation());
//   };
//   const promises = [];
//   startWaitingForEvents();
//   await page.goto(`https://dev-pago.payclip.com/${payment_request_id}`);
//   await Promise.all(promises);

//   let displayed_amount = await page.$eval(
//     "#__next > div.FormPayment_wrapFormPaymentDesktop__bnw2T > div.FormPayment_wrapOrderSummaryColum__ZGvRp > div.OrderSummary_wrapOrderSummary__gt6O5.OrderSummary_desktopStyles__j_lTJ > section.Breakdown_breakdownSection__CVqET.Breakdown_grayLight__hNAYk > section > div.Breakdown_totalRow__ED57c > span.text_span__Q4eOL.text_left__ZQekq.text_semibold__nVajh.text_xxs__x8CSG.text_surface950__Ebmcu > span",
//     (el) => el.textContent
//   );

//   await fillEmail(page, email);
//   await fillPhone(page, phone);
//   await fillCard(page, card);

//   try {
//     await payCheckout(page);
//   } catch (e) {
//     mlog.error(e);
//   }

//   try {
//     await waitForPaymentTransition(page);
//   } catch (e) {
//     mlog.error(e);
//   }

//   const pathImageForSuccessPayPage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/success-pay-page.png`;
//   await takeScreenshotAndSave(pathImageForSuccessPayPage, page, baseDir);
//   const status = "OK";
//   results_run.push([
//     test_case_id,
//     card,
//     email,
//     phone,
//     payment_request_id,
//     payment_flow_type,
//     displayed_amount,
//     payment_request_type,
//     "",
//     status,
//   ]);

//   if (results_run.length > 3) {
//     generateSheet(
//       results_run,
//       `/completed_tests/test_runs/${test_run_id}/${test_run_id}`
//     );
//   }

//   const path_logs_save = `${baseDir}/completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/logs.txt`;
//   await writeFile(path_logs_save, formatRequestLogs(request_log_list));
// };

// describe("One Click", () => {
//   it("Pay Register buyer checkout", async () => {
//     const test_run_id = generateTestRunId();
//     const cluster = await initializeCluster();

//     const parameters = [];
//     createDirectory("completed_tests/test_runs", test_run_id);
//     for (let i = 0; i < MAX_RUNS; i++) {
//       const prs = [
//         "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//         "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//         "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//         "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//       ];
//       parameters.push({
//         test_case_id: generateTestCaseId(i),
//         card: "5215956400364553",
//         email: generateRandomEmail(),
//         phone: "1234567891",
//         payment_request_id: prs[i],
//         payment_flow_type: "GUEST",
//         payment_request_type: "HX",
//         test_run_id,
//         baseDir: BASE_DIR,
//         request_log_list: [],
//         i,
//       });
//     }

//     parameters.forEach((p) =>
//       cluster.execute([
//         p.test_case_id,
//         p.card,
//         p.email,
//         p.phone,
//         p.payment_request_id,
//         p.payment_flow_type,
//         p.payment_request_type,
//         p.test_run_id,
//         p.baseDir,
//         p.request_log_list,
//         p.i,
//       ])
//     );

//     await cluster.idle();
//     await cluster.close();

//     generateSheet(
//       results_run,
//       `/completed_tests/test_runs/${test_run_id}/${test_run_id}`
//     );
//   });
// });
