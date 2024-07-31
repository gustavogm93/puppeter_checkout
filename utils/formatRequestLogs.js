

const HEADER_COLOR = `\x1b[7m` ; 
  const RESET = '\x1b[0m';

const CONST_COLOR = `\x1b[34m` ; 
const RESPONSE_COLOR = `\x1b[38;5;130m` ; 
const LOW_IMPORTANCE_RESPONSE_COLOR = '\x1b[38;5;237m'
const addColorToText = (text, color) => {
  return `${text}`;
}


  function formatRequestLogs2(requests) {
    return requests.map(request => {
      const correctCodes = [200, 201, 204]
      const codeSymbol = correctCodes.includes(request.statusCode) ? '🟢' : '🔴' 
      return `
[{ ⬇️  ${addColorToText(request.url, HEADER_COLOR)}  

${addColorToText("HTTP Status:", CONST_COLOR)}  ${addColorToText(request.statusCode, RESPONSE_COLOR)} ${codeSymbol}

${addColorToText("HTTP Headers:", CONST_COLOR)}  ${addColorToText(request.headers, LOW_IMPORTANCE_RESPONSE_COLOR)}  

${addColorToText("payload:", CONST_COLOR)}  ${addColorToText(request.payload, RESPONSE_COLOR)}  

${addColorToText("response:", CONST_COLOR)}  ${addColorToText(JSON.stringify(request?.response), RESPONSE_COLOR)} 

${addColorToText("timestamp:", CONST_COLOR)}  ${addColorToText(request.timestamp, RESPONSE_COLOR)} 🕐 
  
  }]\n`;
    }).join('\n');
  }


  const requests = [
    {
      "url": "https://dev-pago.payclip.com/api/oneClick/clipDetectCustomer",
      "headers": "{\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"127\\\", \\\"Not)A;Brand\\\";v=\\\"99\\\"\",\"content-type\":\"text/plain;charset=UTF-8\",\"referer\":\"https://dev-pago.payclip.com/9131e884-faf2-4416-ad26-4e29a8a8a0fd\",\"accept-language\":\"en-US\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/127.0.0.0 Safari/537.36\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"accept\":\"*/*\",\"cookie\":\"ajs_user_id=64733935-7d05-4512-8a12-a0c26113d21d; ajs_anonymous_id=41481250-493a-4e2e-8c37-9ec6a992d0d6; _dd_s=rum=2&id=e4e10263-f389-4b42-9728-28610e5478a9&created=1722395096768&expire=1722395998658&logs=1\",\"origin\":\"https://dev-pago.payclip.com\"}",
      "payload": "{\"email\":\"for_guest_tests_m9q2rrgg@example.com\",\"paymentRequestId\":\"9131e884-faf2-4416-ad26-4e29a8a8a0fd\"}",
      "statusCode": 200,
      "response": "Failed to get customer",
      "timestamp": "2024-07-31T03:04:59.747Z"
    }
  ];




  console.log(formatRequestLogs2(requests));



function formatRequestLogs(requests) {
  return requests.map(request => {
    const correctCodes = [200, 201, 204]
    const codeSymbol = correctCodes.includes(request.statusCode) ? '🟢' : '🔴' 
    return `[{ ⬇️  - HTTP Request - ⬇️ 
"${request.url}"

${codeSymbol} HTTP Status: ${request.statusCode}

HTTP Headers: 
${request.headers}

payload: 
${JSON.stringify(request?.payload)}

response:
"${JSON.stringify(request?.response)}"

🕐 timestamp:
"${request.timestamp}"

}]\n\n`;
  }).join('\n');
}


  module.exports = { formatRequestLogs, formatRequestLogs2 }