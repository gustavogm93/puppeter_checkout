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
  filterParameters,
  noPresentTypeInFilters,
} = require("../src/runner/filterParameters");
require("dotenv").config();
const { validateParameters } = require("../src/validations/validateParameters");
const CreateCheckout = require("../src/service/createCheckout");
const CreateCheckoutV2 = require("../src/service/createCheckoutV2.class");

const env = (process.env.ENV || "dev").toLocaleLowerCase(); //Change environment::
const PARAMETERS_SHEET_NAME = `parameters_${env}.xlsx`;
const FILTER_OPTIONS = [
  { key: "JUST", value: process.env.JUST },
  { key: "TYPE", value: process.env.TYPE }, //LINK, HXO, SUB
];

describe("Checkout Payments", () => {
  let PARAMETERS_MAP;
  let cluster;
  before(async () => {
    const buffer = readSheet(PARAMETERS_SHEET_NAME);
    PARAMETERS_MAP = mappingTypeWithParameters(buffer);
    validateParameters(PARAMETERS_MAP);
    mlog.log("Filter options => ", JSON.stringify(FILTER_OPTIONS));
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
    let isSkipped = false;
    try {
      //Skip tests if filter by no link de pago types::
      if (
        noPresentTypeInFilters(
          FILTER_OPTIONS,
          PAYMENT_REQUEST_TYPES.LINK_DE_PAGO
        )
      ) {
        mlog.log("Skip Link de pago tests");
        isSkipped = true;
        return;
      }
      //Get by Type and filter by filter options
      const parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO),
        FILTER_OPTIONS
      );
      if (!parametersFromSheet || parametersFromSheet.length === 0) {
        mlog.log("No test cases parameters found for Link de pago");
        return;
      }

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
          i: i,
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
      if (!isSkipped) {
        logHeader({}, `Write Excel results: ${test_run_id}`);
        generateSheet(
          results_run,
          `/completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.LINK_DE_PAGO.toLocaleLowerCase()}/${test_run_id}/${test_run_id}`
        );
      }
    }
  });

  it("Create and Pay Hosted Checkout", async () => {
    const results_run = [];
    let test_run_id;
    let isSkipped = false;

    try {
      //Skip tests if filter by no hosted checkout types::
      if (
        noPresentTypeInFilters(
          FILTER_OPTIONS,
          PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT
        )
      ) {
        mlog.log("Skip Hosted Checkout tests");
        isSkipped = true;
        return;
      }

      const parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT),
        FILTER_OPTIONS
      );

      if (!parametersFromSheet || parametersFromSheet.length === 0) {
        mlog.log("No test cases parameters found for Hosted Checkout");
        return;
      }

      const _createCheckout = new CreateCheckoutV2(env.toUpperCase());

      try {
        const responsesCheckoutV2 =
          await _createCheckout.executeMultipleCreateCheckouts(
            parametersFromSheet
          );
        // Add Pr Id to previous parameters
        parametersFromSheet.map((param) => {
          responsesCheckoutV2.filter(({ response, request }) => {
            const { currency, amount, testCaseName } = request;

            if (
              //Check all conditions to match arguments and PR id
              param.testCaseName === testCaseName &&
              param.currency === currency &&
              param.amount === amount
            ) {
              param.prId = response.payment_request_id;
            }
          });
          return param;
        });
      } catch (e) {
        mlog.error("Error at creation multiple checkouts" + e);
        return;
      }

      let i = 0;
      test_run_id = generateTestRunId(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT);

      await cluster.task(async ({ page, data }) => {
        await taskCheckoutPay(page, data, test_run_id, results_run);
      });

      const parameters = [];

      //Create Run directory
      await createDirectory(
        `completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT.toLocaleLowerCase()}`,
        test_run_id
      );
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
    } catch (error) {
      mlog.error(err);
    } finally {
      //Save if is not skipped
      await cluster.idle();
      await cluster.close();
      if (!isSkipped) {
        logHeader({}, `Write Excel results: ${test_run_id}`);
        generateSheet(
          results_run,
          `/completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT.toLocaleLowerCase()}/${test_run_id}/${test_run_id}`
        );
      }
    }
  });

  it("Create and Pay Subscription", async () => {
    const results_run = [];
    let test_run_id;
    let isSkipped = false;
    try {
      //Skip tests if filter by no Subscriptions types::
      if (
        noPresentTypeInFilters(
          FILTER_OPTIONS,
          PAYMENT_REQUEST_TYPES.SUBSCRIPTION
        )
      ) {
        mlog.log("Skip Subscription tests");
        isSkipped = true;
        return;
      }

      //Get by Type and filter by filter options
      const parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(PAYMENT_REQUEST_TYPES.SUBSCRIPTION),
        FILTER_OPTIONS
      );
      if (!parametersFromSheet || parametersFromSheet.length === 0) {
        mlog.log("No test cases parameters found for Subscription");
        return;
      }
      test_run_id = generateTestRunId(PAYMENT_REQUEST_TYPES.SUBSCRIPTION);

      await cluster.task(async ({ page, data }) => {
        await taskCheckoutPay(page, data, test_run_id, results_run);
      });

      const parameters = [];

      //Create Run directory
      await createDirectory(
        `completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.SUBSCRIPTION.toLocaleLowerCase()}`,
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
          i: i,
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
      if (!isSkipped) {
        logHeader({}, `Write Excel results: ${test_run_id}`);
        generateSheet(
          results_run,
          `/completed_tests/test_runs/${env.toUpperCase()}-${PAYMENT_REQUEST_TYPES.SUBSCRIPTION.toLocaleLowerCase()}/${test_run_id}/${test_run_id}`
        );
      }
    }
  });
});
