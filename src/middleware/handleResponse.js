const handleResponse = async (response, request_log_list) => {
  const request = response.request();
  if (request.url().startsWith("https://dev-pago.payclip.com/api/")) {
    const statusCode = await response.status();
    const responseJson = await response.json();
    request_log_list.push({
      url: request.url(),
      headers: JSON.stringify(request.headers()),
      payload: request.postData(),
      statusCode,
      response: responseJson,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = { handleResponse };
