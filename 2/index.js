const _ = require("lodash");
const data = require("./data");

const opMap = {
  1: _.add,
  2: _.multiply
};

const run = (arr, startIndex = 0) => {
  const op = opMap[arr[startIndex]];
  const firstPosition = arr[startIndex + 1];
  const secondPosition = arr[startIndex + 2];
  const placement = arr[startIndex + 3];
  arr.splice(placement, 1, op(arr[firstPosition], arr[secondPosition]));
  const nextIndex = startIndex + 4;
  const nextOp = arr[nextIndex];
  if (opMap[nextOp]) {
    return run(arr, nextIndex);
  }
  return arr;
};

const real = (one, two) => {
  const copy = [...data];
  copy[1] = one;
  copy[2] = two;
  return run(copy);
};

const limit = 100;

const matrix = _.flatten(
  _.range(0, limit).map(num => _.range(0, limit).map(sec => [num, sec]))
);

const needle = 19690720;

const test = arr => {
  return real(...arr)[0] === needle;
};

matrix.forEach(arr => {
  if (test(arr)) {
    console.log({ arr });
  }
});
