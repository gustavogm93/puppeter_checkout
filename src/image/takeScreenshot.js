const { writeFile } = require("../lib/fs_utils");
const mlog = require("mocha-logger");

async function takeScreenshotAndSave(pathImage, targetPage, baseDir) {
  try {
    const buffer = await targetPage.screenshot({
      path: pathImage,
      fullPage: true,
    });
  } catch (e) {
    throw new Error("Error taking screenshot and saving it: " + e.message);
  }
}

module.exports = { takeScreenshotAndSave };
