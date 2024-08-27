const { mappingTypeWithParameters } = require("../mappingTypeToParameters");
const { PAYMENT_REQUEST_TYPES } = require("../../enums/paymentFlowTypes");
const { PAYMENT_FLOWS } = require("../../enums/paymentFlowTypes");
const {
  validatePRType,
  validatePaymentFlow,
  validateAndFormatCardNumber,
  validatePRId,
  validateAmount,
  validateCurrency,
} = require("../../validations/paymentRequestItemsValidator");

jest.mock("../parameterUtils", () => ({
  generateRandomEmail: jest.fn(() => "test@example.com"),
}));

jest.mock("../format_utils", () => ({
  formatCardNumber: jest.fn((cardNumber) => cardNumber),
}));

describe("mappingTypeWithParameters", () => {
  it("should process valid data correctly", () => {
    const mockData = [
      ["Header1", "Header2", "Header3", "Header4", "Header5"],
      [
        "Test1",
        "5581168067405507",
        "PR001",
        PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT,
        PAYMENT_FLOWS.GUEST,
        "100",
        "USD",
      ],
      [
        "Test2",
        "5581 1680 6740 5507",
        "PR002",
        PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT,
        PAYMENT_FLOWS.REGISTER,
        "1000",
        "MXN",
      ],
    ];

    const result = mappingTypeWithParameters(mockData);

    expect(result.size).toBe(1);
    expect(result.get(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT)).toHaveLength(2);
  });

  // ... (other existing tests)
});

describe("validatePRType", () => {
  it("should not throw for valid PR types", () => {
    expect(() =>
      validatePRType(PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT)
    ).not.toThrow();
  });

  it("should throw for invalid PR types", () => {
    expect(() => validatePRType("INVALID_TYPE")).toThrow(
      "Invalid payment request type"
    );
  });
});

describe("validatePaymentFlow", () => {
  it("should not throw for valid payment flows", () => {
    expect(() => validatePaymentFlow(PAYMENT_FLOWS.GUEST)).not.toThrow();
    expect(() => validatePaymentFlow(PAYMENT_FLOWS.REGISTER)).not.toThrow();
    expect(() => validatePaymentFlow(PAYMENT_FLOWS.SUBSCRIPTION)).not.toThrow();
  });

  it("should throw for invalid payment flows", () => {
    expect(() => validatePaymentFlow("INVALID_FLOW")).toThrow(
      "Invalid payment flow"
    );
  });
});

describe("validateAndFormatCardNumber", () => {
  it("should validate and format valid string card numbers", () => {
    expect(validateAndFormatCardNumber("5581168067405507")).toBe(
      "5581168067405507"
    );
    expect(validateAndFormatCardNumber("5581 1680 6740 5507")).toBe(
      "5581168067405507"
    );
    expect(validateAndFormatCardNumber("5581168067405507")).toBe(
      "5581168067405507"
    );
  });

  it("should validate and format valid number card numbers", () => {
    expect(validateAndFormatCardNumber(4111111111111111)).toBe(
      "4111111111111111"
    );
  });

  it("should throw an error for invalid card numbers", () => {
    expect(() => validateAndFormatCardNumber("411111111111")).toThrow(
      "Invalid card number"
    );
    expect(() => validateAndFormatCardNumber("411111111111111111111")).toThrow(
      "Invalid card number"
    );
  });

  it("should throw an error for invalid input types", () => {
    expect(() => validateAndFormatCardNumber({})).toThrow(
      "Invalid card number type"
    );
    expect(() => validateAndFormatCardNumber([])).toThrow(
      "Invalid card number type"
    );
    expect(() => validateAndFormatCardNumber(true)).toThrow(
      "Invalid card number type"
    );
  });
});

describe("validateAmount", () => {
  it("should validate correct amounts", () => {
    expect(validateAmount("100", "USD")).toBe("100");
    expect(validateAmount("1000", "MXN")).toBe("1000");
  });

  it("should throw an error for invalid amounts", () => {
    expect(() => validateAmount("0", "USD")).toThrow("Invalid amount");
    expect(() => validateAmount("-10", "USD")).toThrow("Invalid amount");
    expect(() => validateAmount("abc", "USD")).toThrow("Invalid amount");
  });

  it("should throw an error for amounts exceeding the maximum", () => {
    expect(() => validateAmount("151", "USD")).toThrow(
      "Amount exceeds maximum for USD"
    );
    expect(() => validateAmount("1501", "MXN")).toThrow(
      "Amount exceeds maximum for MXN"
    );
  });
});

describe("validateCurrency", () => {
  it("should validate correct currencies", () => {
    expect(validateCurrency("USD")).toBe("USD");
    expect(validateCurrency("MXN")).toBe("MXN");
  });

  it("should throw an error for invalid currencies", () => {
    expect(() => validateCurrency("EUR")).toThrow("Invalid currency");
    expect(() => validateCurrency("usd")).toThrow("Invalid currency");
  });
});

describe("validatePRId", () => {
  it("should return valid PR IDs", () => {
    expect(validatePRId("PR001")).toBe("PR001");
    expect(validatePRId("PR1234")).toBe("PR1234");
    expect(validatePRId("CustomID123")).toBe("CustomID123");
  });

  it("should throw an error for invalid PR IDs", () => {
    expect(() => validatePRId("")).toThrow("Invalid PR ID");
    expect(() => validatePRId("  ")).toThrow("Invalid PR ID");
    expect(() => validatePRId(null)).toThrow("Invalid PR ID");
    expect(() => validatePRId(undefined)).toThrow("Invalid PR ID");
    expect(() => validatePRId(123)).toThrow("Invalid PR ID");
  });

  it("should trim PR IDs", () => {
    expect(validatePRId(" PR001 ")).toBe("PR001");
  });
});

// ... (other existing tests)
