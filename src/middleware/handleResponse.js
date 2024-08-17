function handleResponse(response, request_log_list) {
  const request = response.request();
  if (
    request?.url() &&
    (request?.url()?.startsWith(PAGE_URL[env]) ||
      request?.url().startsWith(SECURE_API[env]))
  ) {
    response.status().then((statusCode) => {
      response.json().then((responseJson) => {
        const request_log = {
          url: request.url(),
          headers: JSON.stringify(request.headers()),
          payload: request.postData(),
          statusCode: statusCode,
          response: responseJson,
          timestamp: new Date().toISOString(),
        };
        request_log_list.push(request_log);
      });
    });
  }
}

module.exports = { handleResponse };
