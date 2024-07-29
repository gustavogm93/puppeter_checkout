const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
function generateSheet(data) {

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/base.xlsx`));

console.log(workSheetsFromBuffer);
const filePath = path.join(__dirname, '/worksheets.xlsx');

  const range = {s: {c: 0, r: 0}, e: {c: 0, r: 3}};
  const sheetOptions = {'!merges': [range]};

  const common = workSheetsFromBuffer[0].data;
  common.push(...data)
  var buffer = xlsx.build([{name: 'mySheetName', data: common}], {sheetOptions}); 

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return console.error(`Error writing file: ${err}`);
        }
        console.log(`Buffer saved to ${filePath}`);
    })
}

const data = [
    [1, 2, 3],
    [true, false, null, 'sheetjs'],
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
    ['baz', null, 'qux'],
  ];
generateSheet(data);


module.exports = { generateSheet }