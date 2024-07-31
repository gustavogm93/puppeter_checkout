const mlog = require("mocha-logger");

const SIZE_LOG_WIDTH = 64

function centerHeader(header, size) {
try {
  let totalLength = size
  let headerLength = header.length;
  let paddingLength = Math.floor((totalLength - headerLength) / 2);

  let paddedHeader = ' '.repeat(paddingLength) + header + ' '.repeat(paddingLength);
  
  // If the total length is odd and the header length is even (or vice versa), add one more space to the end
  if (paddedHeader.length < totalLength) {
    paddedHeader += ' ';
  }

  return paddedHeader;
} catch (e) {
  mlog.error("que da est" + e);
}
}

function logHeader(data, headerString) {
  const val = centerHeader(headerString, SIZE_LOG_WIDTH)
  mlog.log("----------------------------------------------------------------");
  mlog.log(`${val}`);
  mlog.log("----------------------------------------------------------------");

  if(data !== null) {
    Object.entries(data).forEach(([key, value]) => {
    mlog.log(`${key}:`, value);
  });
}

}



module.exports = { logHeader };
