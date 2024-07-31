const fs = require("fs");
const path = require("path");
const mlog = require("mocha-logger");
const fsProm = require("fs").promises;

async function writeFile(filePath, buffer) {
  try {
    fsProm.writeFile(filePath, buffer, (err) => {
      if (err) {
        return console.error(`Error writing file: ${err}`);
      }
      console.log(`Buffer saved to ${filePath}`);
    });
  } catch (e) {
    mlog.error(e);
  }
}

async function createDirectory(relativePath, folderName) {
  const relativePaths = relativePath.split("/");
  relativePaths.push(folderName);

  const pathRelative = "/" + relativePaths.join("/");
  const __rootDir = process.cwd();
  console.log(pathRelative);

  const dirPath = path.join(__rootDir, relativePaths.join("/"));

  try {
    await fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`);
  }
}

async function prependToFile(newString, relativePath) {
  const path = relativePath + "logs.txt";

  try {
    // Read the existing content of the file
    let data = "";
    try {
      data = await fsProm.readFile(path, "utf8");
    } catch (err) {
      if (err.code !== "ENOENT") {
        //Ignore errors: meaning that even the file is not present make the write
      }
    }

    // Create the new content by prepending the new string
    const updatedContent = `${newString}\n${data}`;

    // Write the updated content back to the file
    await fsProm.writeFile(path, updatedContent, "utf8");
    console.log("File updated successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = { writeFile, createDirectory, prependToFile };
