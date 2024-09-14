const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require("path");

const BASE_CSV_FILE = "base.xlsx";
const BASE_DIR = process.cwd();
function readSheet(fileName) {
  const REQUIRED_CSV_COLUMNS = 4;

  const workSheetsFromBuffer = xlsx.parse(
    fs.readFileSync(`${BASE_DIR}/${fileName}`)
  );

  //remove empty rows;
  const values = workSheetsFromBuffer[0].data.filter(
    (data) => data.length >= REQUIRED_CSV_COLUMNS
  );

  return values;
}

function generateSheet(data, _path) {
  //Get base excel from /base.xlsx
  const workSheetsFromBuffer = xlsx.parse(
    fs.readFileSync(`${BASE_DIR}/${BASE_CSV_FILE}`)
  );

  const filePath = path.join(BASE_DIR, `${_path}_results.xlsx`);

  const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
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
  });
}

module.exports = { generateSheet, readSheet };
