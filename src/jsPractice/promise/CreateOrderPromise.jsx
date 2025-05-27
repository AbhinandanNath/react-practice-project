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

const cart = ["shoes", "mobile"];

function validateCart(cart) {
  return cart.length == 0;
}
function createOrder(cart) {
  const createPromise = new Promise((resolve, reject) => {
    if (validateCart(cart)) {
      let cartError = new Error("Cart is not valid");
      reject(cartError);
    }
    let orderId = "12345"; //lets say you get orderID from the DB
    if (orderId) {
      resolve(orderId);
    } else {
      let orderError = new Error("Order is not valid");
      reject(orderError);
    }
  });

  return createPromise;
}

function proceedToPayment(orderId) {
  const paymentPromise = new Promise((resolve, reject) => {
    if (!orderId) {
      let paymentError = new Error("Not a valid orderId");
      reject(paymentError);
    }
    let paymentInfo = "Payment is Succesfull";
    resolve(paymentInfo);
  });

  return paymentPromise;
}
export default function CreateOrderPromise() {
  const createOrderPromise = createOrder(cart);
  createOrderPromise
    .then(function (orderId) {
      console.log(orderId);
      return orderId;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (orderId) {
      return proceedToPayment(orderId);
    })
    .then(function (paymentInfo) {
      console.log(paymentInfo);
    })
    .catch(function (error) {
      console.log(error);
    });

  return <div>Create Order</div>;
}
