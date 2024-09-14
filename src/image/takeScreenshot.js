
async function takeScreenshotAndSave(pathImage, targetPage) {
  try {
    await targetPage.screenshot({
      path: pathImage,
      fullPage: true,
    });
  } catch (e) {
    throw new Error("Error taking screenshot and saving it: " + e.message);
  }
}

module.exports = { takeScreenshotAndSave };
