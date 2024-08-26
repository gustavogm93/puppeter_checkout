const mlog = require("mocha-logger");
const { ACTION_ERROR_MESSAGES } = require("../constants/errorMessage");
const { run } = require("../helpers/runFn");
const {
  fillEmail,
  fillPhone,
  fillCard,
  payCheckout,
  waitForPaymentTransition,
  clickSaveMyInfo,
  getSummaryAmount,
} = require("../actions/module/actions-module");
const { getSuccessPaymentPage } = require("../actions/getSuccessPaymentPage");
const { generateSubscription } = require("./subscriptionTask");
const { writeFile, createDirectory } = require("../lib/fs_utils");
const { getFormattedDateTime } = require("../lib/date_utils");
const { takeScreenshotAndSave } = require("../image/takeScreenshot");
const { formatRequestLogs } = require("../lib/formatRequestLogs");
const {
  PAYMENT_FLOW_TYPES,
  PAYMENT_REQUEST_TYPES,
} = require("../enums/paymentFlowTypes");
const {
  DEV,
  CHECKOUT_PAGE_URL,
  SECURE_API,
  SUBSCRIPTION_PAGE_URL,
} = require("../constants/environment");
const { logHeader } = require("../lib/logger");
require("dotenv").config();

const env = (process.env.ENV || DEV).toUpperCase(); // environment;
const SAVE_TEST_DIR = `completed_tests/test_runs`;

async function taskCheckoutPay(page, data, test_run_id, results_run) {
  const DEFAULT_PAGE_TIMEOUT = 15000;
  const TIMEOUT_WAIT_LOGS = 3000;
  const BASE_DIR = process.cwd();
  const {
    test_case_id,
    card,
    email,
    phone,
    payment_request_id,
    payment_flow_type,
    payment_request_type,
    request_log_list,
    i,
  } = data;

  let status = "OK";
  let displayed_amount;
  let TEST_CASE_ID_FULL_PATH;
  try {
    logHeader(data, "PARAMETERS");
    logHeader({}, "GENERATING DIRECTORY...");

    createDirectory(
      `${SAVE_TEST_DIR}/${env}-${payment_request_type.toLocaleLowerCase()}/${test_run_id}`,
      test_case_id
    );

    /* 
    Structure => completed_tests/test_runs/Env+PaymentType/test_run_id/test_case_id 
    Example    => completed_tests/test_runs/DEV-link_de_pago/09_30_11.30.00/GUEST_MXN
     */
    TEST_CASE_ID_FULL_PATH = `${SAVE_TEST_DIR}/${env}-${payment_request_type.toLocaleLowerCase()}/${test_run_id}/${test_case_id.toString()}`;

    await page.setViewport({ width: 1280, height: 1080 });
    await page.setRequestInterception(true);
    page.setDefaultTimeout(DEFAULT_PAGE_TIMEOUT);

    const targetPage = page;

    targetPage.on("request", (request) => {
      if (request.resourceType() === "image") request.abort();
      request.continue();
    });

    targetPage.on("response", async (response) => {
      const request = response.request();

      const requestUrl = request?.url();
      if (
        requestUrl &&
        !requestUrl.includes("_next/data") &&
        (requestUrl?.startsWith(CHECKOUT_PAGE_URL[env]) ||
          requestUrl.startsWith(SECURE_API[env]))
      ) {
        const statusCode = await response?.status();
        const responseJson = await response?.json();
        const request_log = {
          url: request.url(),
          headers: JSON.stringify(request.headers()),
          payload: request.postData(),
          statusCode: statusCode,
          response: responseJson,
          timestamp: new Date().toISOString(),
        };
        request_log_list.push(request_log);
      }
    });

    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    const promises = [];
    startWaitingForEvents();

    if (PAYMENT_REQUEST_TYPES.SUBSCRIPTION === payment_request_type) {
      const url = SUBSCRIPTION_PAGE_URL[env];
      logHeader({}, `Generating subscription ${test_case_id}`);
      await run(
        async () =>
          await generateSubscription(
            targetPage,
            url,
            data,
            TEST_CASE_ID_FULL_PATH
          ),
        ACTION_ERROR_MESSAGES.GENERATING_SUBSCRIPTION
      );
    }

    if (payment_request_type !== PAYMENT_REQUEST_TYPES.SUBSCRIPTION) {
      await targetPage.goto(`${CHECKOUT_PAGE_URL[env]}/${payment_request_id}`);
    }
    await Promise.all(promises);

    if (
      payment_request_type !== PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT &&
      payment_request_type !== PAYMENT_REQUEST_TYPES.SUBSCRIPTION
    ) {
      await run(
        async () => await fillEmail(targetPage, email),
        ACTION_ERROR_MESSAGES.FILL_EMAIL
      );
    }

    if (
      payment_request_type !== PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT &&
      payment_request_type !== PAYMENT_REQUEST_TYPES.SUBSCRIPTION
    ) {
      logHeader({}, `Filling Phone ${test_case_id}`);
      await run(
        async () => await fillPhone(targetPage, phone),
        ACTION_ERROR_MESSAGES.FILL_PHONE
      );
    }

    logHeader({}, `Filling Card: ${test_case_id}`);
    await run(
      async () => await fillCard(targetPage, card),
      ACTION_ERROR_MESSAGES.FILL_CARD
    );

    if (
      PAYMENT_FLOW_TYPES.GUEST === payment_flow_type &&
      PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT !== payment_request_type
    ) {
      await run(
        async () => await clickSaveMyInfo(targetPage),
        ACTION_ERROR_MESSAGES.CLICK_SAVE_MY_INFO
      );
    }

    //Get the payment amount in the checkout page
    displayed_amount = await getSummaryAmount(
      page,
      payment_request_type === PAYMENT_REQUEST_TYPES.SUBSCRIPTION
    );

    logHeader({}, `Save screenshot for form page fill: ${test_case_id}`);
    const PATH_IMAGE_FORM_PAGE = `${TEST_CASE_ID_FULL_PATH}/form-page-fill.png`;

    await takeScreenshotAndSave(PATH_IMAGE_FORM_PAGE, targetPage);

    //Click pay button
    await run(
      async () => await payCheckout(page, i),
      ACTION_ERROR_MESSAGES.PAY_CHECKOUT
    );

    await run(
      async () =>
        await waitForPaymentTransition(
          page,
          payment_request_type === PAYMENT_REQUEST_TYPES.SUBSCRIPTION
        ),
      ACTION_ERROR_MESSAGES.WAIT_PAYMENT_TRANSITION
    );

    logHeader({}, `Paying in: ${test_case_id}`);
    await run(
      async () =>
        await getSuccessPaymentPage(
          page,
          payment_request_type === PAYMENT_REQUEST_TYPES.SUBSCRIPTION
        ),
      ACTION_ERROR_MESSAGES.PAYMENT_SUCCESS
    );

    logHeader({}, `Save screenshot for success pay page: ${test_case_id}`);
    const PATH_IMAGE_SUCCESS_PAGE = `${TEST_CASE_ID_FULL_PATH}/success-pay-page.png`;
    await takeScreenshotAndSave(PATH_IMAGE_SUCCESS_PAGE, targetPage);
  } catch (e) {
    status = `Failed reason: { ${e} }`;
    mlog.error(e);
    logHeader({}, `Save screenshot for  error ocurred: ${test_case_id}`);

    const PATH_IMAGE_ERROR_HAPPENED = `${TEST_CASE_ID_FULL_PATH}/error-ocurred.png`;
    await takeScreenshotAndSave(PATH_IMAGE_ERROR_HAPPENED, page);
  } finally {
    {
      //Generate result for excel
      const result_test_case = [
        test_case_id,
        card,
        email,
        phone,
        payment_request_id,
        payment_flow_type,
        displayed_amount,
        payment_request_type,
        getFormattedDateTime(),
        status,
      ];

      results_run.push(result_test_case);

      logHeader({}, `Save logs: ${test_case_id}`);
      const PATH_LOG_SAVE_DIR =
        BASE_DIR + `/${TEST_CASE_ID_FULL_PATH}/logs.txt`;

      logHeader({}, `Write Logs results: ${test_case_id}`);
      setTimeout(
        async () =>
          await writeFile(
            PATH_LOG_SAVE_DIR,
            formatRequestLogs(request_log_list),
            TIMEOUT_WAIT_LOGS
          )
      );
    }
  }
}

module.exports = { taskCheckoutPay };
