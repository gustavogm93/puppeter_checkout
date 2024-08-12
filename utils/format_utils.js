//formatting 5215956400364553 => 5215 9564 0036 4553
function formatCardNumber(cardNumber) {
  let finalFormat;
  if (isNumber(cardNumber)) {
    const cardNumberString = JSON.stringify(cardNumber);

    finalFormat = cardNumberString.replace(/(.{4})/g, "$1 ").trim();
  } else {
    const normalizedToFirstFormat = cardNumber.split(" ").join("");

    const normalizeToNumber = JSON.stringify(Number(normalizedToFirstFormat));

    finalFormat = normalizeToNumber.replace(/(.{4})/g, "$1 ").trim();
  }

  console.log(finalFormat, "--------------------------------");
  assertCardFormat(finalFormat);
  return finalFormat;
}

function assertCardFormat(cardString) {
  // Create a regular expression to match the format xxxx xxxx xxxx xxxx
  const regex = /^\d{4} \d{4} \d{4} \d{4}$/;

  // Assert that the string matches the regex pattern
  console.assert(
    regex.test(cardString),
    `Assertion failed: "${cardString}" is not in the format xxxx xxxx xxxx xxxx`
  );
}

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

module.exports = { formatCardNumber };
