const { PAYMENT_REQUEST_TYPES } = require("../test/enums/paymentFlowTypes");
const { generateRandomEmail } = require("../data_sample");

function mappingTypeWithParameters(data) {
  const mapParameters = new Map();
  for (let i = 1; i < data.length; i++) {
    //Must have every column filled in excel
    let containAllColumns;
    try {
      containAllColumns =
        data[i][0] && data[i][1] && data[i][2] && data[i][3] && data[i][4];
      const prType = data[i][3];

      const parametersArray = mapParameters.get(prType) || [];
      const parameters = {
        testCaseName: data[i][0],
        cardNumber: data[i][1],
        prId: data[i][2],
        prType: data[i][3],
        paymentFlow: data[i][4],
        email: generateRandomEmail(), //each email will be generated, if add card on file or another login process will be changed.
        phone: "1234567890",
      };
      if (prType === PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT) {
        parameters.amount = data[i][5];
        parameters.currency = data[i][6];
      }
      parametersArray.push(parameters);

      mapParameters.set(prType, parametersArray);
    } catch (e) {
      console.error(e, "Must contain all columns filled in excel");
      throw e; // re-throw the error for the caller to handle.
    }
  }
  return mapParameters;
}

module.exports = { mappingTypeWithParameters };
