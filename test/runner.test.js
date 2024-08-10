const { Cluster } = require("puppeteer-cluster");
const mlog = require("mocha-logger");

const { taskCheckoutPay } = require("./runner/clusterTask");
const { createDirectory } = require("../utils/fs_utils");
const { generateSheet, readSheet } = require("../excel");

const { generateRandomEmail, generateTestRunId } = require("../data_sample");
const { logHeader } = require("../utils/logger");
const {} = require("../utils/convertExcelDataToObject");
const {
  mappingTypeWithParameters,
} = require("../utils/mappingTypeToParameters");
const { PAYMENT_REQUEST_TYPES } = require("./enums/paymentFlowTypes");
const {
  executeMultipleCreateCheckoutsV2,
} = require("../service/createCheckoutV2.service");

const PARAMETERS_SHEET_NAME = "parameters.xlsx";

describe("One Click", () => {
  let PARAMETERS_MAP;
  before(() => {
    const buffer = readSheet(PARAMETERS_SHEET_NAME);
    PARAMETERS_MAP = mappingTypeWithParameters(buffer);
  });

  // it("Pay Link de Pago", async () => {
  //   try {
  //     const results_run = [];
  //     let i = 0;
  //     const test_run_id = generateTestRunId(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO);

  //     const cluster = await Cluster.launch({
  //       concurrency: Cluster.CONCURRENCY_CONTEXT,
  //       maxConcurrency: 4,
  //     });

  //     await cluster.task(async ({ page, data }) => {
  //       await taskCheckoutPay(page, data, test_run_id, results_run);
  //     });

  //     const parameters = [];

  //     //Create Run directory
  //     await createDirectory("completed_tests/test_runs", test_run_id);

  //     //These are the parameters from excel.
  //     const parametersFromSheet = PARAMETERS_MAP.get(
  //       PAYMENT_REQUEST_TYPES.LINK_DE_PAGO
  //     );

  //     if (!parametersFromSheet || parametersFromSheet.length === 0) {
  //       mlog.error("No parameters found in the excel sheet.");
  //       return;
  //     }

  //     //Get number of test cases by iterations.
  //     const ITERATIONS = parametersFromSheet.length;

  //     for (let i = 0; i < ITERATIONS; i++) {
  //       const data = parametersFromSheet[i];
  //       const { testCaseName, cardNumber, prId, prType, paymentFlow } = data;
  //       console.log(testCaseName, cardNumber, prId, prType, paymentFlow);

  //       const value = {
  //         test_case_id: testCaseName,
  //         card: cardNumber, //cards[i],
  //         email: generateRandomEmail(),
  //         phone: "1234567891",
  //         payment_request_id: prId,
  //         payment_request_type: prType,
  //         payment_flow_type: paymentFlow,
  //         request_log_list: [],
  //         iterations: ITERATIONS,
  //         i: i,
  //       };
  //       parameters.push(value);
  //     }
  //     parameters.map(async (p) => {
  //       await cluster.execute(p);
  //     });

  //     await cluster.idle();
  //     await cluster.close();

  //     logHeader({}, `Write Excel results: ${test_run_id}`);
  //     generateSheet(
  //       results_run,
  //       `/completed_tests/test_runs/${test_run_id}/${test_run_id}`
  //     );
  //   } catch (err) {
  //     mlog.error(err);
  //   }
  // });

  it("create and Pay Hosted Checkout", async () => {
    const parametersFromSheet = PARAMETERS_MAP.get(
      PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT
    );

    if (!parametersFromSheet || parametersFromSheet.length === 0) {
      mlog.error("No parameters found in the excel sheet.");
      return;
    }
    try {
      const responsesCheckoutV2 = await executeMultipleCreateCheckoutsV2(
        parametersFromSheet
      );

      // Add Pr Id to previous parameters
      await parametersFromSheet.map(async (param) => {
        responsesCheckoutV2.filter(async ({ promise, request }) => {
          const { currency, amount, testCaseName } = request;
          console.log(currency, amount, testCaseName);

          if (
            //Check all conditions to match arguments and PR id
            param.testCaseName === testCaseName &&
            param.currency === currency &&
            param.amount === amount
          ) {
            mlog.log(await promise.json(), "ENTRA ACA");
            mlog.log(await promise.json(), "2222333ENTRA ACA");
            param.prId = await promise.json().payment_request_id;

            console.log(
              await promise.json().payment_request_id,
              "2222ENTRA ACA"
            );
          }
        });
        return param;
      });
    } catch (error) {
      mlog.error("Error at creation of payment request", error);
    }
    console.log(JSON.stringify(parametersFromSheet));
    return;
    const results_run = [];
    let i = 0;
    const test_run_id = generateTestRunId(
      PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT
    );

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
    });

    await cluster.task(async ({ page, data }) => {
      await taskCheckoutPay(page, data, test_run_id, results_run);
    });

    const parameters = [];

    //Create Run directory
    await createDirectory("completed_tests/test_runs", test_run_id);

    //Get number of test cases by iterations.
    const ITERATIONS = parametersFromSheet.length;

    for (let i = 0; i < ITERATIONS; i++) {
      const data = parametersFromSheet[i];
      const {
        testCaseName,
        cardNumber,
        prId,
        prType,
        paymentFlow,
        email,
        phone,
      } = data;
      console.log(testCaseName, cardNumber, prId, prType, paymentFlow);

      const value = {
        test_case_id: testCaseName,
        card: cardNumber, //cards[i],
        email: email,
        phone: phone,
        payment_request_id: prId,
        payment_request_type: prType,
        payment_flow_type: paymentFlow,
        request_log_list: [],
        iterations: ITERATIONS,
        i: i,
      };
      parameters.push(value);
    }

    parameters.map(async (p) => {
      await cluster.execute(p);
    });

    await cluster.idle();
    await cluster.close();

    logHeader({}, `Write Excel results: ${test_run_id}`);
    generateSheet(
      results_run,
      `/completed_tests/test_runs/${test_run_id}/${test_run_id}`
    );
  });
});
