export default function getSumPromise() {
  function findSum(inputArray) {
    // let sum = 0;
    // for (let i = inputArray[0]; i <= inputArray[1]; i++) {
    //   sum += i;
    // }
    // return sum;

    //sum of n terms (n * (n + 1)) / 2;
    let firstTerm = inputArray[0];
    const lastTerm = inputArray[1];
    const totalterms = lastTerm - firstTerm + 1;
    return (totalterms / 2) * (firstTerm + lastTerm);
  }
  const promise1 = new Promise(function (resolve, reject) {
    resolve(findSum([1, 500]));
  });
  const promise2 = new Promise(function (resolve, reject) {
    // resolve(findSum([501, 1000]));
    reject("testing");
  });

  return Promise.allSettled([promise1, promise2])
    .then(function (finalSumArray) {
      return findSum(finalSumArray);
    })
    .catch(function (error) {
      console.log(error);
    });
}
