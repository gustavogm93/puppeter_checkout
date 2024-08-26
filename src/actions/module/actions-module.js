const { fillEmail } = require("../fillEmail.js");
const { fillPhone } = require("../fillPhone.js");
const { fillCard } = require("../fillCard.js");
const { payCheckout } = require("../payCheckout.js");
const { waitForPaymentTransition } = require("../waitForPaymentTransition.js");
const {
  checkElementsInLoadingTransition,
} = require("../checkElementsInLoadingTransition.js");
const { clickSaveMyInfo } = require("../clickSaveMyInfo.js");
const { getSummaryAmount } = require("../getSummaryAmount.js");

module.exports = {
  clickSaveMyInfo,
  fillEmail,
  fillPhone,
  fillCard,
  waitForPaymentTransition,
  checkElementsInLoadingTransition,
  payCheckout,
  getSummaryAmount,
};
