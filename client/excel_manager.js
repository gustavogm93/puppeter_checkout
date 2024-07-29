const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

class ExcelManager {
    constructor(directory) {
        this.directory = directory;

        // Ensure the directory exists
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    // Method to write data to an Excel file
    writeToFile(filename, data) {
        const filePath = path.join(this.directory, filename);
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        xlsx.writeFile(workbook, filePath);
        console.log(`File written: ${filePath}`);
    }

    // Method to read data from an Excel file
    readFromFile(filename) {
        const filePath = path.join(this.directory, filename);

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        return data;
    }
}

module.exports = { ExcelManager }