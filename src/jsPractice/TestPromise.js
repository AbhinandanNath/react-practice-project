// Promise is an object which is placeholder which will be filled later with a value
// or Promise is an object which is placeholder for a certain period of time till we get a value from an asynchronous operation
// or Promise in an object which acts a container for some future value
// or Promise is an object represting eventual completion of an asynchornous operation

// Example
// suppose we have a cart aplication where we want to place an order..
// createCart -> makes an api call to store the orders in the backend and return orderIds
// proceedToPayment -> based on those orderId we move to paymentPage and make Payment ..which returns the total paymentInfo
// showorderSummary --> based on the payment info we show the order summary
// updateWalletBalance --> and finally after showing the order details we will update the balance
// if we didnt have promises we would have use nested callbacks to achieve this .
// Nested callbacksknow as call back hell or pyramid doom
// now we have if else checks or more api calls this becomes complex and hard to maintain
const GITHUB_API = "https://api.github.com/users/abhinandanNath";
const cart = ["shoes", "mobile"];
// createOrder(cart, function (orderId) {
//   proceedToPayment(orderId, function (paymentInfo) {
//     showorderSummary(paymentInfo, function () {
//       updateWalletBalance();
//     });
//   });
// });

// This is resolved /simplified using promises. This is handled using promise chaining.

// const promise = createOrder(cart); // creating a promise
// promise
//   .then(function (orderId) {
//     return proceedToPayment(orderId);
//   })
//   .then(function (paymentInfo) {
//     return showorderSummary(paymentInfo);
//   })
//   .then(function (paymentPage) {
//     return updateWalletBalance();
//   });

// //oR using arrow functions
// createOrder(cart)
//   .then((orderId) => proceedToPayment(orderId))
//   .then((paymentInfo) => showorderSummary(paymentInfo))
//   .then((paymentPage) => updateWalletBalance());

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
}
