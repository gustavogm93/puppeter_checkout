function convertExcelDataToObject(data) {
  if (!data || data.length === 0) throw new Error("no data to convert");

  const obj = {};
  const parametersList = [];
  for (let i = 1; i < data.length; i++) {
    //Must have every column filled in excel
    if (data[i][0] && data[i][1] && data[i][2] && data[i][3])
      parametersList.push({
        cardNumber: data[i][0],
        prId: data[i][1],
        prType: data[i][2],
        paymentFlow: data[i][3],
      });
  }
  return parametersList;
}

module.exports = { convertExcelDataToObject };
