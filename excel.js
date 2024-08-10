const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require("path");

const BASE_CSV_FILE = "base.xlsx";

function readSheet(fileName) {
  const workSheetsFromBuffer = xlsx.parse(
    fs.readFileSync(`${__dirname}/${fileName}`)
  );

  return workSheetsFromBuffer[0].data;
}

function generateSheet(data, _path) {
  //Get base excel from /base.xlsx
  const workSheetsFromBuffer = xlsx.parse(
    fs.readFileSync(`${__dirname}/${BASE_CSV_FILE}`)
  );

  const filePath = path.join(__dirname, `${_path}_results.xlsx`);

  const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } };
  const sheetOptions = { "!merges": [range] };

  const common = workSheetsFromBuffer[0].data;
  common.push(...data);
  var buffer = xlsx.build([{ name: "mySheetName", data: common }], {
    sheetOptions,
  });

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      return console.error(`Error writing file: ${err}`);
    }
    console.log(`Buffer saved to ${filePath}`);
  });
}


module.exports = { generateSheet, readSheet };
