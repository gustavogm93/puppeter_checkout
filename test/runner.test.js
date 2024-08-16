const { Cluster } = require("puppeteer-cluster");
const mlog = require("mocha-logger");

const { taskCheckoutPay } = require("../src/runner/clusterTask");
const { createDirectory } = require("../src/lib/fs_utils");
const { generateSheet, readSheet } = require("../src/lib/excel_utils");

const { generateTestRunId } = require("../src/lib/parameterUtils");
const { logHeader } = require("../src/lib/logger");
const {} = require("../src/lib/convertExcelDataToObject");
const {
  mappingTypeWithParameters,
} = require("../src/lib/mappingTypeToParameters");
const { PAYMENT_REQUEST_TYPES } = require("../src/enums/paymentFlowTypes");
const {
  executeMultipleCreateCheckoutsV2,
} = require("../src/service/createCheckoutV2.service");
const { filterParameters } = require("../src/runner/filterParameters");
require("dotenv").config();
const { validateParameters } = require("../src/validations/validateParameters");

const env = (process.env.ENV || "dev").toLocaleLowerCase(); //Change environment::
const PARAMETERS_SHEET_NAME = `parameters_${env}.xlsx`;
const FILTER_OPTIONS = [{ key: "JUST", value: process.env.JUST }];

describe("One Click", () => {
  let PARAMETERS_MAP;
  let cluster;

  before(async () => {
    const buffer = readSheet(PARAMETERS_SHEET_NAME);
    PARAMETERS_MAP = mappingTypeWithParameters(buffer);
    validateParameters(PARAMETERS_MAP);
  });

  beforeEach(async () => {
    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
    });
  });

  it("Pay Link de Pago", async () => {
    const results_run = [];
    let test_run_id;
    try {
      //Get by Type and filter by filter options
      console.log(FILTER_OPTIONS, "Filter");
      const parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO),
        FILTER_OPTIONS
      );

      if (!parametersFromSheet || parametersFromSheet.length === 0)
        throw new Error("No parameters found for this type");

      test_run_id = generateTestRunId(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO);
      await cluster.task(async ({ page, data }) => {
        await taskCheckoutPay(page, data, test_run_id, results_run);
      });

      const parameters = [];

      //Create Run directory
      await createDirectory(
        `completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.LINK_DE_PAGO.toLocaleLowerCase()}`,
        test_run_id
      );

      const ITERATIONS = parametersFromSheet.length;

      for (let i = 0; i < ITERATIONS; i++) {
        const data = parametersFromSheet[i];
        const {
          testCaseName,
          cardNumber,
          prId,
          prType,
          paymentFlow,
          phone,
          email,
        } = data;

        const value = {
          test_case_id: testCaseName,
          card: cardNumber,
          email: email,
          phone: phone,
          payment_request_id: prId,
          payment_request_type: prType,
          payment_flow_type: paymentFlow,
          request_log_list: [],
        };
        parameters.push(value);
      }

      parameters.forEach(async (p) => {
        await cluster.execute(p);
      });
    } catch (err) {
      mlog.error(err);
    } finally {
      await cluster.idle();
      await cluster.close();
      logHeader({}, `Write Excel results: ${test_run_id}`);
      generateSheet(
        results_run,
        `/completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.LINK_DE_PAGO.toLocaleLowerCase()}/${test_run_id}/${test_run_id}`
      );
    }
  });

  // it("create and Pay Hosted Checkout", async () => {
  //   try {
  //     const parametersFromSheet = PARAMETERS_MAP.get(
  //       PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT
  //     );

  //     if (!parametersFromSheet || parametersFromSheet.length === 0) {
  //       mlog.error("No parameters found in the excel sheet.");
  //       return;
  //     }

  //     const responsesCheckoutV2 = await executeMultipleCreateCheckoutsV2(
  //       parametersFromSheet
  //     );

  //     // Add Pr Id to previous parameters
  //     parametersFromSheet.map((param) => {
  //       responsesCheckoutV2.filter(({ response, request }) => {
  //         const { currency, amount, testCaseName } = request;
  //         console.log(currency, amount, testCaseName);

  //         if (
  //           //Check all conditions to match arguments and PR id
  //           param.testCaseName === testCaseName &&
  //           param.currency === currency &&
  //           param.amount === amount
  //         ) {
  //           param.prId = response.payment_request_id;
  //         }
  //       });
  //       return param;
  //     });

  //     const results_run = [];
  //     let i = 0;
  //     const test_run_id = generateTestRunId(
  //       PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT
  //     );

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

  //     //Get number of test cases by iterations.
  //     const ITERATIONS = parametersFromSheet.length;

  //     for (let i = 0; i < ITERATIONS; i++) {
  //       const data = parametersFromSheet[i];
  //       const {
  //         testCaseName,
  //         cardNumber,
  //         prId,
  //         prType,
  //         paymentFlow,
  //         email,
  //         phone,
  //       } = data;
  //       console.log(testCaseName, cardNumber, prId, prType, paymentFlow);

  //       const value = {
  //         test_case_id: testCaseName,
  //         card: cardNumber, //cards[i],
  //         email: email,
  //         phone: phone,
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
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
});
