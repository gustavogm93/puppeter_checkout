const { writeFile} = require('../../utils/fs_utils.js')
const mlog = require('mocha-logger');



async function takeScreenshotAndSave(pathImage, targetPage, baseDir ) {
try {

    const buffer = await targetPage.screenshot({
    path: pathImage,
    fullPage: true
  });
  const filePath = path.join(baseDir, pathImage.indexOf(1));

  writeFile(filePath, buffer)
} catch(e) {
  
  //  mlog.error(e + "Cannot save screenshot");
}

} 

module.exports = {takeScreenshotAndSave}