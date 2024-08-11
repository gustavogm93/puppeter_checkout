const HEADER_COLOR = `\x1b[7m`;
const RESET = "\x1b[0m";
const CONST_COLOR = `\x1b[34m`;
const RESPONSE_COLOR = `\x1b[38;5;130m`;
const LOW_IMPORTANCE_RESPONSE_COLOR = "\x1b[38;5;237m";
const addColorToText = (text, color) => {
  return `${text}`;
};

function formatRequestLogs(requests) {
  return requests
    .map((request) => {
      const correctCodes = [200, 201, 204];
      const codeSymbol = correctCodes.includes(request.statusCode)
        ? "🟢"
        : "🔴";
      return `
[{ ⬇️  ${addColorToText(request.url, HEADER_COLOR)}  

${addColorToText("HTTP Status:", CONST_COLOR)}  ${addColorToText(
        request.statusCode,
        RESPONSE_COLOR
      )} ${codeSymbol}

${addColorToText("HTTP Headers:", CONST_COLOR)}  ${addColorToText(
        request.headers,
        LOW_IMPORTANCE_RESPONSE_COLOR
      )}  

${addColorToText("payload:", CONST_COLOR)}  ${addColorToText(
        request.payload,
        RESPONSE_COLOR
      )}  

${addColorToText("response:", CONST_COLOR)}  ${addColorToText(
        JSON.stringify(request?.response),
        RESPONSE_COLOR
      )} 

${addColorToText("timestamp:", CONST_COLOR)}  ${addColorToText(
        request.timestamp,
        RESPONSE_COLOR
      )} 🕐 
  
  }]\n`;
    })
    .join("\n");
}

module.exports = { formatRequestLogs };
