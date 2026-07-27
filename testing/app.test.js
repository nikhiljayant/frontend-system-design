// Unit Testing

const sortNumbers = require("./app");

test("testing if the first element is 0 after sorting", () => {
  const sortedData = sortNumbers();

  expect(sortedData[0]).toBe(1);
});

test("testing if the sorting function has returned something properly", () => {
  const sortedData = sortNumbers();

  expect(sortedData[0]).not.toBe(undefined);
});
