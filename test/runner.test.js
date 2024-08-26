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
const CreateCheckoutV2 = require("../src/service/createCheckoutV2.class");
const { logHeader } = require("../src/lib/logger");

require("dotenv").config();

const env = (process.env.ENV || "dev").toLowerCase();
const PARAMETERS_SHEET_NAME = `parameters_${env}.xlsx`;
const FILTER_OPTIONS = [
  { key: "JUST", value: process.env.JUST },
  { key: "TYPE", value: process.env.TYPE },
];

describe("Checkout Payments", () => {
  let PARAMETERS_MAP;
  let cluster;

  before(async () => {
    const buffer = readSheet(PARAMETERS_SHEET_NAME);
    PARAMETERS_MAP = mappingTypeWithParameters(buffer);
    validateParameters(PARAMETERS_MAP);
    console.log("Filter options => ", JSON.stringify(FILTER_OPTIONS));

    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
    });
  });

  after(async () => {
    await cluster.close();
  });

  const runTest = async (paymentType, createCheckout = false) => {
    const results_run = [];
    let test_run_id;
    let isSkipped = false;
    let hasParameters = true;

    try {
      if (noPresentTypeInFilters(FILTER_OPTIONS, paymentType)) {
        console.log(`Skip ${paymentType} tests`);
        isSkipped = true;
        return;
      }

      let parametersFromSheet = filterParameters(
        PARAMETERS_MAP.get(paymentType),
        FILTER_OPTIONS
      );

      if (!parametersFromSheet || parametersFromSheet.length === 0) {
        console.log(`No test cases parameters found for ${paymentType}`);
        hasParameters = false;
        return;
      }

      if (createCheckout) {
        const _createCheckout = new CreateCheckoutV2(env.toUpperCase());
        const responsesCheckoutV2 =
          await _createCheckout.executeMultipleCreateCheckouts(
            parametersFromSheet
          );
        parametersFromSheet = parametersFromSheet.map((param) => {
          const matchingResponse = responsesCheckoutV2.find(
            ({ response, request }) =>
              param.testCaseName === request.testCaseName &&
              param.currency === request.currency &&
              param.amount === request.amount
          );
          if (matchingResponse) {
            param.prId = matchingResponse.response.payment_request_id;
          }
          return param;
        });
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

  it("Pay Link de Pago", async () => {
    await runTest(PAYMENT_REQUEST_TYPES.LINK_DE_PAGO);
  });

  it("Create and Pay Hosted Checkout", async () => {
    await runTest(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT, true);
  });

  it("Create and Pay Subscription", async () => {
    await runTest(PAYMENT_REQUEST_TYPES.SUBSCRIPTION);
  });
});
