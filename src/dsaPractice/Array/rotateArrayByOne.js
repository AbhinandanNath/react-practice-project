/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
function rotateArrayByOne(nums) {
  let elementToBeremoved = nums.shift();
  nums.push(elementToBeremoved);
  return nums;
}
