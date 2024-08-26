const fetch = require("node-fetch");

class CreateCheckout {
  generateBody() {}
  generateHeader() {}
  getUrl() {}

  async executeMultipleCreateCheckouts(data) {
    const url = this.getUrl();
    const header = this.generateHeader();
    const results = await Promise.all(
      data.map(async (unitRequest) => {
        const body = this.generateBody(unitRequest);

        const requestOptions = {
          method: "POST",
          headers: header,
          body: body,
          redirect: "follow",
        };

        return fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) {
              return response.text().then((errorMessage) => {
                throw new Error(
                  `status:[${response.status}] message:[${errorMessage}]`
                );
              });
            }
            return response.json();
          })
          .then((result) => ({
            request: unitRequest,
            response: result,
          }))
          .catch((error) => ({
            request: unitRequest,
            error: error.message,
          }));
      })
    );

    results.forEach((result) => {
      if (result.error) {
        throw new Error(
          "Failed at creating multiple hosted checkouts: " + result.error
        );
      }
    });

    return results;
  }
}

module.exports = CreateCheckout;
