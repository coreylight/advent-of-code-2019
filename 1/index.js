const fs = require("fs");
const _ = require("lodash");
const rawData = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const arr = rawData
  .split("\n")
  .filter(Boolean)
  .map(str => Number(str));

const getFuel = num => Math.floor(num / 3) - 2;

const getFuelArr = arr => {
  const fuel = getFuel(_.last(arr));
  if (fuel > 0) {
    arr.push(fuel);
    return getFuelArr(arr);
  }
  return arr;
};

const getTotalFuel = num => _.sum(getFuelArr([getFuel(num)]));

const getResult = arr => _.sum(arr.map(getTotalFuel));

console.log(getResult(arr));
