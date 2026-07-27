const randomNumbers = [90, 40, 21, 1, 9];

function sortNumbers() {
  const data = randomNumbers.sort((a, b) => a - b);
  return data;
}

module.exports = sortNumbers;
