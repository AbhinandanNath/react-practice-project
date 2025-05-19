/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

function secondLargestElement(nums) {
  if (nums.length == 0 || nums.length == 1) {
    return -1;
  }

  let max = -Infinity;
  let secondMax = -Infinity;
  for (let num of nums) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num < max && secondMax < num) {
      secondMax = num;
    }
  }

  if (secondMax == -Infinity) {
    return -1;
  }

  return secondMax;
}

// Input: nums = [8, 8, 7, 6, 5]

// Output: 7

// Explanation: The largest value in nums is 8, the second largest is 7

// Input: nums = [10, 10, 10, 10, 10]

// Output: -1

// Explanation: The only value in nums is 10, so there is no second largest value, thus -1 is returned
