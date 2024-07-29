

const fs = require('fs');
const path = require('path');


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


async function createDirectory(relativePath, folderName) {
    const relativePaths = relativePath.split('/')
    relativePaths.push(folderName);

  const pathRelative = "/" + relativePaths.join("/");
  const __rootDir =  process.cwd();
  console.log(pathRelative)
  
  const dirPath = path.join(__rootDir, relativePaths.join("/"));
    


    try {
      await fs.mkdir(dirPath, { recursive: true }, (err) => {

        if (err) throw err});
      console.log(`Directory created: ${dirPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
    }
  }




module.exports = {writeFile, createDirectory};