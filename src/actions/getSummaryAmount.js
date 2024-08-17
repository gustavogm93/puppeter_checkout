const mlog = require("mocha-logger");

async function getSummaryAmount(targetPage) {
  return targetPage.$eval(
    "#__next > div.FormPayment_wrapFormPaymentDesktop__bnw2T > div.FormPayment_wrapOrderSummaryColum__ZGvRp > div.OrderSummary_wrapOrderSummary__gt6O5.OrderSummary_desktopStyles__j_lTJ > section.Breakdown_breakdownSection__CVqET.Breakdown_grayLight__hNAYk > section > div.Breakdown_totalRow__ED57c > span.text_span__Q4eOL.text_left__ZQekq.text_semibold__nVajh.text_xxs__x8CSG.text_surface950__Ebmcu > span",
    (el) => el.textContent
  );
}

module.exports = { getSummaryAmount };
