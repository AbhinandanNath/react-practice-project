Object.customAssign = function (target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  sources.forEach((source) => {
    if (source != null) {
      for (let key in source) {
        target[key] = source[key];
      }
    }
  });

  return target;
};
const peopleData = [
  "  John Doe, New York, 12345  ",
  "",
  "Jane Smith, London, 98765",
  "   ",
  "Alice Johnson, Paris, 55555",
  "Bob Lee,   Tokyo, 88888",
  "",
  "   Maria Garcia, Madrid, 22222   ",
  "Liam Wong, Singapore, 33333",
  "   ",
  "Emma Brown, Sydney, 44444",

  "John Doe, Los Angeles, 54321",
  "Emma Brown, Melbourne, 55544",
];
function parseData(peopleData) {
  let dataObj = {};
  peopleData.forEach((item) => {
    let currentDataSet = item
      .split(",")
      .map((item) => item.trim())
      .filter((item) => Boolean(item));
    if (currentDataSet.length !== 0) {
      let [name, place, city] = currentDataSet;
      if (!dataObj[name]) {
        dataObj[name] = {};
      }
      if (!dataObj[name][place]) {
        dataObj[name][place] = {};
      }
      dataObj[name][place] = city;
    }
  });
  return dataObj;
}
