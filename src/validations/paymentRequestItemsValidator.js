const { PAYMENT_REQUEST_TYPES } = require("../enums/paymentFlowTypes");
const { PAYMENT_FLOWS } = require("../enums/paymentFlowTypes");
const { formatCardNumber } = require("../lib/format_utils");

const VALID_CURRENCIES = ["USD", "MXN"];
const MAX_AMOUNT = {
  USD: 150,
  MXN: 1500,
};

function validatePRType(prType) {
  if (!Object.values(PAYMENT_REQUEST_TYPES).includes(prType)) {
    throw new Error(`Invalid payment request type: ${prType}`);
  }
}

function validatePaymentFlow(paymentFlow) {
  if (!Object.values(PAYMENT_FLOWS).includes(paymentFlow)) {
    throw new Error(`Invalid payment flow: ${paymentFlow}`);
  }
}

function validateAndFormatCardNumber(cardNumber) {
  // Convert to string if it's a number
  const cardString =
    typeof cardNumber === "number" ? cardNumber.toString() : cardNumber;

  // Check if it's a string after conversion
  if (typeof cardString !== "string") {
    throw new Error(
      `Invalid card number type: ${typeof cardNumber}. Must be string or number.`
    );
  }

  // Remove any non-digit characters
  const digitsOnly = cardString.replace(/\D/g, "");

  if (!/^\d{13,19}$/.test(digitsOnly)) {
    throw new Error(`Invalid card number: ${cardNumber}`);
  }
  return digitsOnly;
}

function validatePRId(prId) {
  if (!prId || typeof prId !== "string" || prId.trim() === "") {
    throw new Error(`Invalid PR ID: ${prId}`);
  }
  return prId.trim();
}

function validateAmount(amount, currency) {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  if (parsedAmount >= MAX_AMOUNT[currency]) {
    throw new Error(`Amount exceeds maximum for ${currency}: ${amount}`);
  }
  return amount;
}

function validateCurrency(currency) {
  if (!VALID_CURRENCIES.includes(currency)) {
    throw new Error(`Invalid currency: ${currency}. Must be USD or MXN.`);
  }
  return currency;
}

module.exports = {
  validatePRType,
  validatePaymentFlow,
  validateAndFormatCardNumber,
  validatePRId,
  validateAmount,
  validateCurrency,
};
