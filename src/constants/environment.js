const DEV = "DEV";
const STAGE = "STAGE";

const CHECKOUT_PAGE_URL = {
  DEV: "https://dev-pago.payclip.com",
  STAGE: "https://stage-pago.payclip.com",
};
const SUBSCRIPTION_PAGE_URL = {
  DEV: "https://dev-pago.payclip.com",
  STAGE: "https://stage-pago.payclip.com",
};

const SECURE_API = {
  DEV: "https://dev-api-secure.payclip.com/",
  STAGE: "https://stage-api-secure.payclip.com/",
};

const API = {
  V1: {
    DEV: "https://dev-api.payclip.com/checkout",
    STAGE: "https://stageapi-gw.payclip.com/checkout",
  },
  V2: {
    DEV: "https://dev-api.payclip.com/v2/checkout",
    STAGE: "https://stage-api.payclip.com/v2/checkout",
  },
};

module.exports = {
  DEV,
  CHECKOUT_PAGE_URL,
  SUBSCRIPTION_PAGE_URL,
  SECURE_API,
  STAGE,
  API,
};
