const { writeFile } = require("../lib/fs_utils");
const mlog = require("mocha-logger");

async function takeScreenshotAndSave(pathImage, targetPage, baseDir) {
  try {
    const buffer = await targetPage.screenshot({
      path: pathImage,
      fullPage: true,
    });
    const filePath = path.join(baseDir, pathImage.indexOf(1));

    writeFile(filePath, buffer);
  } catch (e) {}
}

module.exports = { takeScreenshotAndSave };
