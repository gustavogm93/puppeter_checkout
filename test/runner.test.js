const { Cluster } = require("puppeteer-cluster");
const { readSheet } = require("../src/lib/excel_utils");
const {
  mappingTypeWithParameters,
} = require("../src/lib/mappingTypeToParameters");
const { validateParameters } = require("../src/validations/validateParameters");
const {
  filterParameters,
  noPresentTypeInFilters,
} = require("../src/runner/filterParameters");
const { PAYMENT_REQUEST_TYPES } = require("../src/enums/paymentFlowTypes");
const { taskCheckoutPay } = require("../src/runner/clusterTask");
const { generateTestRunId } = require("../src/lib/parameterUtils");
const { createDirectory } = require("../src/lib/fs_utils");
const { generateSheet } = require("../src/lib/excel_utils");
const { logHeader, logStart } = require("../src/lib/logger");
const { createCheckouts } = require("../src/runner/checkoutCreator");
const mlog = require("mocha-logger");
var expect = require('expect.js');

require("dotenv").config();

const env = (process.env.ENV || "dev").toLowerCase();
const PARAMETERS_SHEET_NAME = `parameters_${env}.xlsx`;
const FILTER_OPTIONS = [
  { key: "JUST", value: process.env.JUST },
  { key: "TYPE", value: process.env.TYPE },
];



describe("Buyer Checkout Testing Payments", () => {
  let PARAMETERS_MAP;
  let cluster;

  before(async () => {
    const buffer = readSheet(PARAMETERS_SHEET_NAME);
    PARAMETERS_MAP = mappingTypeWithParameters(buffer);
    validateParameters(PARAMETERS_MAP);
    mlog.log("Filter options => ", JSON.stringify(FILTER_OPTIONS.filter((v) => v.value)));

    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
    });
  });

  after(async () => {
    await cluster.idle();
    await cluster.close();
  })

  const runTest = async (paymentType, createCheckout = false) => {
    const results_run = [];
    let test_run_id;
    let isSkipped = false;
    let hasParameters = true;

    try {
      if (noPresentTypeInFilters(FILTER_OPTIONS, paymentType)) {
        console.log(`Skip ${paymentType} tests`);
        isSkipped = true;
        expect(true).to.be(true)
        return;
      }

      logStart(paymentType);

      let parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(paymentType),
        FILTER_OPTIONS
      );

      if (!parametersFromSheet || parametersFromSheet.length === 0) {
        mlog.log(`No test cases parameters found for ${paymentType}`);
        hasParameters = false;
        return;
      }

      if (createCheckout) {
        //Create Multiple Hosted Checkouts
        parametersFromSheet = await createCheckouts(parametersFromSheet, env);
      }

      test_run_id = generateTestRunId(paymentType);
      await createDirectory(
        `completed_tests/test_runs/${env.toUpperCase()}-${paymentType.toLowerCase()}`,
        test_run_id
      );

      await cluster.task(async ({ page, data }) => {
        await taskCheckoutPay(page, data, test_run_id, results_run);
      });

      const parameters = parametersFromSheet.map((data, i) => ({
        test_case_id: data.testCaseName,
        card: data.cardNumber,
        email: data.email,
        phone: data.phone,
        payment_request_id: data.prId,
        payment_request_type: data.prType,
        payment_flow_type: data.paymentFlow,
        request_log_list: [],
        i,
      }));

      await Promise.all(parameters.map((p) => cluster.execute(p)));
    } catch (err) {
      console.error(err);
    } finally {
      if (!isSkipped && hasParameters) {
        logHeader({}, `Write Excel results: ${test_run_id}`);
        generateSheet(
          results_run,
          `/completed_tests/test_runs/${env.toUpperCase()}-${paymentType.toLowerCase()}/${test_run_id}/${test_run_id}`
        );
      }
    }
  };
  //que filtre por el IT npm run test

  it("Pay Link de Pago", async () => {
    await runTest(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO);
  });

  it("Create and Pay Hosted Checkout", async () => {
    const CreateHXOCheckouts = true;
    await runTest(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT, CreateHXOCheckouts);
  });

  it("Create and Pay Subscription", async () => {
    await runTest(PAYMENT_REQUEST_TYPES.SUBSCRIPTION);
  });
});
