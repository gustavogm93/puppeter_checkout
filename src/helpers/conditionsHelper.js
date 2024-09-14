const {
  PAYMENT_FLOWS,
  PAYMENT_REQUEST_TYPES,
} = require("../enums/paymentFlowTypes");

const getTypeConditionsMap = (payment_request_type) => {
  const typeConditionMap = new Map();

  typeConditionMap.set(
    "isSubscription",
    PAYMENT_REQUEST_TYPES.SUBSCRIPTION === payment_request_type
  );
  typeConditionMap.set(
    "isHostedCheckout",
    PAYMENT_REQUEST_TYPES.HOSTED_CHECKOUT === payment_request_type
  );

  typeConditionMap.set(
    "isNotSubscription",
    false === typeConditionMap.get("isSubscription")
  );
  typeConditionMap.set(
    "isNotHostedCheckout",
    false === typeConditionMap.get("isHostedCheckout")
  );

  return typeConditionMap;
};

const getFlowConditionsMap = (payment_flow_type) => {
  const flowConditionMap = new Map();

  flowConditionMap.set("isGuest", PAYMENT_FLOWS.GUEST === payment_flow_type);

  return flowConditionMap;
};

module.exports = { getFlowConditionsMap, getTypeConditionsMap };
