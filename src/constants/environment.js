const DEV = "DEV";
const STAGE = "STAGE";

const CHECKOUT_PAGE_URL = {
  DEV: "https://dev-pago.payclip.com",
  STAGE: "https://stage-pago.payclip.com",
};
const SECURE_API = {
  DEV: "https://dev-api-secure.payclip.com/",
  STAGE: "https://stage-api-secure.payclip.com/",
};

const API = {
  V1: {
    DEV: "https://testapi-gw.payclip.com/checkout",
    STAGE: "https://stageapi-gw.payclip.com/checkout",
  },
  V2: {
    DEV: "https://testapi-gw.payclip.com/checkout/v2",
    STAGE: "https://stageapi-gw.payclip.com/checkout/v2",
  },
};

module.exports = { DEV, CHECKOUT_PAGE_URL, SECURE_API, STAGE, API };
