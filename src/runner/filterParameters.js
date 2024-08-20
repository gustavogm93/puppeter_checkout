//Parameter Filters
const FILTERS = [
  { key: "JUST", fn: (val, limit) => val.slice(0, Number(limit)) },
  {
    key: "TYPE",
    fn: (val, type) => val.filter((i) => i.prType === TYPE[type]),
  },
]; //Get the N Parameter's

const TYPE = {
  LINK: "LINK_DE_PAGO",
  SUB: "SUBSCRIPTION",
  HXO: "HOSTED_CHECKOUT",
};

//Recibe los parametros y le aplica filtros
function filterParameters(parameters, filterObj) {
  const filters = filterObj.filter((v) => v.value);
  if (!filters || !filters.length === 0) {
    return parameters;
  }

  let res;
  filters.forEach((filterUnit) => {
    const foundFilter = FILTERS.find((filter) => filterUnit.key === filter.key);
    res = foundFilter.fn(res || parameters, filterUnit.value);
  });
  return res;
}

/*
FilterObj es un array de key and value de filtros
JUST:1 | 2 | n <= parameters.length 
DCC:1 | TRUE

buscar si filterObj tiene aunque sea 1 key de FILTERS
const keyName = FILTERS.find((filter) =>
  Object.keys(filterObj).includes(filter)
);

*/

module.exports = { filterParameters };

// const parameters = [
//   {
//     testCaseName: "Guest_USD",
//     cardNumber: "4065 5035 1484 6523",
//     prId: "bdb2522e-8955-4c41-8b6a-bef29f9b55da",
//     prType: "LINK_DE_PAGO",
//     paymentFlow: "GUEST",
//     email: "for_guest_tests_z9uzt9ri@example.com",
//     phone: "1234567890",
//   },
//   {
//     testCaseName: "Register_MXN",
//     cardNumber: "5215 9564 0036 4553",
//     prId: "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//     prType: "LINK_DE_PAGO",
//     paymentFlow: "REGISTER",
//     email: "for_guest_tests_moxoguyi@example.com",
//     phone: "1234567890",
//   },
//   {
//     testCaseName: "Guest_MXN_Installments",
//     cardNumber: "5581 1680 6740 5507",
//     prId: "1ff71e00-dc73-4dd6-a01c-f63887a95542",
//     prType: "LINK_DE_PAGO",
//     paymentFlow: "GUEST",
//     email: "for_guest_tests_a4ilu8i1@example.com",
//     phone: "1234567890",
//   },
//   {
//     testCaseName: "Guest_MXN_DCC",
//     cardNumber: "4766 9443 3221 6006",
//     prId: "9131e884-faf2-4416-ad26-4e29a8a8a0fd",
//     prType: "LINK_DE_PAGO",
//     paymentFlow: "GUEST",
//     email: "for_guest_tests_6u2lgl3u@example.com",
//     phone: "1234567890",
//   },
// ];

// // filterParameters(parameters, [{ key: "JUST", value: 3 }]);
