const { writeFile} = require('../../utils/fs_utils.js')
const mlog = require('mocha-logger');



async function takeScreenshotAndSave(pathImage, targetPage ) {
try {
    const baseDir = process.cwd();
    const buffer = await targetPage.screenshot({
    path: pathImage,
    fullPage: true
  });
  mlog.error(baseDir);
  const filePath = path.join(baseDir, pathImage.indexOf(1));
  mlog.error(filePath);

  writeFile(filePath, buffer)
} catch(e) {
  mlog.error(e + "Cannot save screenshot");
}

} 

module.exports = {takeScreenshotAndSave}