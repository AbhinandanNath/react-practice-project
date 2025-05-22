Array.prototype.customIncludes = function (elementToBeSearched, fromIndex = 0) {
  if (!Array.isArray(this) || this.length == 0) {
    return false;
  }

  let array = this;
  let startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  for (let i = startIndex; i < array.length; i++) {
    if (array[i] == elementToBeSearched) {
      return true;
    }
  }

  return false;
};
