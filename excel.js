const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
function generateSheet(data, _path) {

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/base.xlsx`));

const filePath = path.join(__dirname, `${_path}.xlsx`);

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
    [1, 2, 3,4,5,6],
    [true, false, null, 'sheetjs'],
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
    ['baz', null, 'qux'],
  ];
generateSheet(data, "mySheetName");


module.exports = { generateSheet }