const CreateCheckoutV2 = require("../service/createCheckoutV2.class");

async function createCheckouts(parametersFromSheet, env) {
  const _createCheckout = new CreateCheckoutV2(env.toUpperCase());
  const responsesCheckoutV2 =
    await _createCheckout.executeMultipleCreateCheckouts(parametersFromSheet);

  return parametersFromSheet.map((param) => {
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

module.exports = { createCheckouts };
