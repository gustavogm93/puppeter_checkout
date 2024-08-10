const {
  generateBodyCheckoutV2,
  generateHeadersCheckoutV2,
} = require("./createCheckoutV2.helper");
require("dotenv").config();
const fetch = require("node-fetch");

const URL = `${process.env.API}/checkout/v2`;

async function executeMultipleCreateCheckoutsV2(data) {
  data.length = 2;
  const header = generateHeadersCheckoutV2();
  const results = await Promise.all(
    data.map((unitRequest) => {
      const body = generateBodyCheckoutV2(unitRequest);

      const requestOptions = {
        method: "POST",
        headers: header,
        body: body,
        redirect: "follow",
      };

      // Return a promise that includes both the fetch and the original request
      return fetch(URL, requestOptions)
        .then((response) => response.json()) // Assuming the response is in JSON format
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

  // Loop through the results array and access the original request and the response
  results.forEach((result) => {
    if (result.response) {
      console.log("Request:", result.request);
      console.log("Response:", result.response);
    } else {
      console.log("Request:", result.request);
      console.error("Error:", result.error);
    }
  });
  // const results = await Promise.all(
  //   data.map((unitRequest) => {
  //     //  const { currency, amount, email, phone } = unitRequest;

  //     const body = generateBodyCheckoutV2(unitRequest);

  //     const requestOptions = {
  //       method: "POST",
  //       headers: header,
  //       body: body,
  //       redirect: "follow",
  //     };
  //     return new Promise({
  //       promise: fetch(URL, requestOptions),
  //       request: unitRequest,
  //     });
  //   })
  // );
  console.log(results);
  throw new Error("-");
  results.forEach(async (res) => {
    const result = await res.promise;
    if (result.status !== 200 && result.status !== 201) {
      throw new Error(
        "Error creating checkouts status: " +
          result.status +
          " message: " +
          result.statusText
      );
    }
  });

  return results;
}

module.exports = { executeMultipleCreateCheckoutsV2 };
