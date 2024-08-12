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
    data.map(async (unitRequest) => {
      const body = generateBodyCheckoutV2(unitRequest);

      const requestOptions = {
        method: "POST",
        headers: header,
        body: body,
        redirect: "follow",
      };

      return fetch(URL, requestOptions)
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

module.exports = { executeMultipleCreateCheckoutsV2 };
