const {ExcelManager} = require('./excel_manager.js')



const excelManager = new ExcelManager('./done_tests');

const dataToWrite = [
    { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' }
];

// Writing data to an Excel file
excelManager.writeToFile('test.xlsx', dataToWrite);

// Reading data from an Excel file
const readData = excelManager.readFromFile('test.xlsx');
console.log(readData);