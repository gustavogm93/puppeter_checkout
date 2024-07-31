

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


  
  function prependToFile(newString) {
    const path = 'output.txt';

    // Read the existing content of the file
    fs.readFile(path, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading the file:', err);
            return;
        }
        
        // Create the new content by prepending the new string
        const updatedContent = `${newString}\n${data || ''}`;
        
        // Write the updated content back to the file
        fs.writeFile(path, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log('File updated successfully');
        });
    });
}

module.exports = {writeFile, createDirectory, prependToFile};