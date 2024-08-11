//formatting 5215956400364553 => 5215 9564 0036 4553
function formatCardNumber(cardNumber) {
  //remove spaces between numbers
  const normalizedToFirstFormat = JSON.stringify(cardNumber).replace(
    /\s+/g,
    ""
  );

  const finalFormat = normalizedToFirstFormat.replace(/(.{4})/g, "$1 ").trim();
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

module.exports = { formatCardNumber };
