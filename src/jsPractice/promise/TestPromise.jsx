import CreateOrderPromise from "./CreateOrderPromise";

const GITHUB_API = "https://api.github.com/users/abhinandanNath";
export default function TestPromise() {
  function printDataValue(data) {
    console.log(data);
  }
  // const userData = fetch(GITHUB_API);
  // console.log(userData);
  // userData.then(printDataValue);

  const myPromise = new Promise((res, reject) => {
    if (1) {
      res("Success value");
    } else {
      reject("Error reason");
    }
  });

  myPromise
    .then((value) => {
      console.log(value); // "Success value"
    })
    .catch((error) => {
      console.log(error); //"Error reason"
    })
    .finally(() => {
      printDataValue("Promise Fulfilled");
    });

  Promise.resolve(1)
    .then((val) => val + 1)
    .then((val) => val + 2)
    .then((val) => printDataValue(val))
    .catch((error) => printDataValue(error));

  const p1 = new Promise((res) => setTimeout(() => res("first"), 200));
  const p2 = new Promise((res, reject) => setTimeout(() => res("Second"), 100));
  const p3 = new Promise((res) => setTimeout(() => res("Third"), 300));

  Promise.all([p1, p2, p3])
    .then((val) => printDataValue(val))
    .catch((error) => printDataValue(error));

  Promise.race([p1, p2, p3])
    .then((val) => printDataValue(val))
    .catch((error) => printDataValue(error));

  function delay(ms) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(`${ms / 1000} seconds Passed`);
      }, ms)
    );
  }
  delay(2000)
    .then((val) => printDataValue(val))
    .catch((error) => printDataValue(error));

  return <CreateOrderPromise />;
}
