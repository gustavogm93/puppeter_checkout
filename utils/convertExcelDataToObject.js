function convertExcelDataToObject(data) {
  if (!data || data.length === 0) throw new Error("no data to convert");

  const obj = {};
  const parametersList = [];
  for (let i = 1; i < data.length; i++) {
    //Must have every column filled in excel
    if (data[i][0] && data[i][1] && data[i][2] && data[i][3])
      parametersList.push({
        testCaseName: data[i][0],
        cardNumber: data[i][1],
        prId: data[i][2],
        prType: data[i][3],
        paymentFlow: data[i][4],
      });
  }
  return parametersList;
}

module.exports = { convertExcelDataToObject };
