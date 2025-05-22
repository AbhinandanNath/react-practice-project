Array.prototype.customMap = function (callbackFn) {
  if (this.lenght == 0 || !Array.isArray(this)) {
    return "Not a valid input";
  }

  let array = this;
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    resultArray[i] = callbackFn(array[i], i);
  }
  return resultArray;
};
