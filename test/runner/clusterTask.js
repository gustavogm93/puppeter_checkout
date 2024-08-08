await cluster.task(async ( data, results_run ) => {
    const {
      test_case_id,
      card,
      email,
      phone,
      payment_request_id,
      payment_flow_type,
      payment_request_type,
      request_log_list,
      iterations,
      i,
    } = data;
    let status = "OK";

    logHeader(data, "PARAMETERS");
    logHeader({}, "GENERATING DIRECTORY...");

    createDirectory(`completed_tests/test_runs/${test_run_id}`, test_case_id);

    await page.setViewport({ width: 1280, height: 1080 });
    await page.setRequestInterception(true);

    page.setDefaultTimeout(timeout);

    const targetPage = page;

    targetPage.on("request", (request) => {
      if (request.resourceType() === "image") request.abort();

      if (
        request?.url() &&
        (request?.url().startsWith("https://dev-pago.payclip.com/api/") ||
        request?.url().startsWith("https://dev-api-secure.payclip.com/"))
      ) {
      }
      request.continue();
    });

    targetPage.on("response", async (response) => {
      const request = response.request();
      if (
        request?.url() &&
        (request?.url()?.startsWith("https://dev-pago.payclip.com/api/") ||
        request?.url().startsWith("https://dev-api-secure.payclip.com/"))
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
    await targetPage.goto(
      `https://dev-pago.payclip.com/${payment_request_id}`
    );
    await Promise.all(promises);

    //get amount:

    let displayed_amount = await targetPage.$eval(
      "#__next > div.FormPayment_wrapFormPaymentDesktop__bnw2T > div.FormPayment_wrapOrderSummaryColum__ZGvRp > div.OrderSummary_wrapOrderSummary__gt6O5.OrderSummary_desktopStyles__j_lTJ > section.Breakdown_breakdownSection__CVqET.Breakdown_grayLight__hNAYk > section > div.Breakdown_totalRow__ED57c > span.text_span__Q4eOL.text_left__ZQekq.text_semibold__nVajh.text_xxs__x8CSG.text_surface950__Ebmcu > span",
      (el) => el.textContent
    );

    //INTERACTIONS:::
    {
      await targetPage.keyboard.down("Meta");
    }
    {
      await targetPage.keyboard.up("Meta");
    }

    {
      logHeader({}, `Fill Email: ${test_case_id}`);
      await fillEmail(targetPage, email);
    }
    {
      logHeader({}, `Fill Phone ${test_case_id}`);
      await fillPhone(targetPage, phone);
    }
    {
      logHeader({}, `Fill Card: ${test_case_id}`);
      await fillCard(targetPage, card);
    }
    {
      if (payment_flow_type === PAYMENT_FLOW_TYPES.GUEST) {
        await clickSaveMyInfo(targetPage);
      }
    }
    {
      logHeader({}, `Save screenshot for form page fill: ${test_case_id}`);
      //Save Checkout Form in screenshot
      const pathImageForFormPage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/form-page-fill.png`;
      await takeScreenshotAndSave(pathImageForFormPage, targetPage, baseDir);
    }
    {
      //Click in Pay

      try {
        await payCheckout(page);
      } catch (e) {
        status = "failed";
        mlog.error(e);
      }
    }
    {
      //Wait for Loading transition page
      try {
        await waitForPaymentTransition(page);
      } catch (e) {
        status = "failed";
        mlog.error(e);
      }
    }

    {
      logHeader({}, `Save screenshot for success pay page: ${test_case_id}`);
      try {
        //Save Success Page in screenshot

        const pathImageForSuccessPayPage = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/success-pay-page.png`;
        await takeScreenshotAndSave(
          pathImageForSuccessPayPage,
          targetPage,
          baseDir
        );

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
        const path_logs_save =
          baseDir +
          `/completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/logs.txt`;

        logHeader({}, `Write Logs results: ${test_case_id}`);
        setTimeout(
          async () =>
            await writeFile(
              path_logs_save,
              formatRequestLogs(request_log_list),
              TIMEOUT_WAIT_LOGS
            )
        );
      } catch (e) {
        mlog.error(e, "--------------------------------");
      }
    }
  });