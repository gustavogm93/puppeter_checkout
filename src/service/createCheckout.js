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
              throw new Error(`HTTP error! status: ${response.status}`);
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

    console.log(results);
    results.forEach((result) => {
      if (result.error) {
        console.error("Error:", result.error);
        throw new Error("Error creating checkouts: " + result.error);
      }
    });

    return results;
  }
}

module.exports = CreateCheckout;
