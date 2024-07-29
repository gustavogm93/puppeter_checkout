

const fs = require('fs');


function writeFile(filePath, buffer) {

try {
fs.writeFile(filePath, buffer, (err) => {
    if (err) {
        return console.error(`Error writing file: ${err}`);
    }
    console.log(`Buffer saved to ${filePath}`);
})
} catch (e) {
  mlog.error(e);
}
}

module.exports = {writeFile};