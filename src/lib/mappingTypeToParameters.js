const { PAYMENT_REQUEST_TYPES } = require("../enums/paymentFlowTypes");
const { generateRandomEmail } = require("./parameterUtils");
const {
  validatePRType,
  validatePaymentFlow,
  validateAndFormatCardNumber,
  validatePRId,
  validateAmount,
  validateCurrency,
} = require("../validations/paymentRequestItemsValidator");

const VALID_CURRENCIES = ["USD", "MXN"];
const MAX_AMOUNT = {
  USD: 150,
  MXN: 1500,
};

function mappingTypeWithParameters(data) {
  if (!Array.isArray(data) || data.length < 2) {
    throw new Error(
      "Invalid data format: Expected a 2D array with at least two rows"
    );
  }

  const mapParameters = new Map();

  for (let i = 1; i < data.length; i++) {
    try {
      const row = data[i];
      if (!isValidRow(row)) {
        logInvalidRow(row);
        continue;
      }

      const parameters = createParameters(row);

      const parametersArray = mapParameters.get(parameters.prType) || [];
      parametersArray.push(parameters);
      mapParameters.set(parameters.prType, parametersArray);
    } catch (e) {
      console.error(e, `Error processing row ${i}`);
    }
  }
  return mapParameters;
}

function isValidRow(row) {
  return (
    Array.isArray(row) &&
    row.length >= 5 &&
    row.every((cell, index) => {
      if (index < 5) return Boolean(cell);
      return true;
    })
  );
}

function logInvalidRow(row) {
  console.error(
    "Invalid row: Must contain at least 5 non-empty string values",
    ...row.slice(0, 5)
  );
}

function createParameters(row) {
  const [
    testCaseName,
    cardNumber,
    prId,
    prType,
    paymentFlow,
    amount,
    currency,
  ] = row;

  validatePRType(prType);
  validatePaymentFlow(paymentFlow);

  const parameters = {
    testCaseName,
    cardNumber: validateAndFormatCardNumber(cardNumber),
    prId: validatePRId(prId),
    prType,
    paymentFlow,
    email: generateRandomEmail(),
    phone: "1234567890",
  };

  if (prType === PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT) {
    if (!amount || !currency) {
      throw new Error("Hosted checkout requires amount and currency");
    }
    parameters.amount = validateAmount(amount, currency);
    parameters.currency = validateCurrency(currency);
  }

  return parameters;
}

module.exports = {
  mappingTypeWithParameters,
  isValidRow,
  createParameters,
  validatePRType,
  validatePaymentFlow,
  validateAndFormatCardNumber,
  validatePRId,
  validateAmount,
  validateCurrency,
};
