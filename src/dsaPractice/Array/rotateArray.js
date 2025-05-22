function rotateArary(nums, k) {
  if (k > nums.length) {
    k = k - nums.length;
  }
  let elementToBeMoved = nums.splice(0, k);
  for (let el of elementToBeMoved) {
    nums.push(el);
  }

  return nums;
}

// Input: nums = [1, 2, 3, 4, 5, 6], k = 2

// Output: nums = [3, 4, 5, 6, 1, 2]

// Explanation: rotate 1 step to the left: [2, 3, 4, 5, 6, 1]

// rotate 2 steps to the left: [3, 4, 5, 6, 1, 2]

// Input: nums = [3, 4, 1, 5, 3, -5], k = 8

// Output: nums = [1, 5, 3, -5, 3, 4]

// Explanation: rotate 1 step to the left: [4, 1, 5, 3, -5, 3]

// rotate 2 steps to the left: [1, 5, 3, -5, 3, 4]

// rotate 3 steps to the left: [5, 3, -5, 3, 4, 1]

// rotate 4 steps to the left: [3, -5, 3, 4, 1, 5]

// rotate 5 steps to the left: [-5, 3, 4, 1, 5, 3]

// rotate 6 steps to the left: [3, 4, 1, 5, 3, -5]

// rotate 7 steps to the left: [4, 1, 5, 3, -5, 3]

// rotate 8 steps to the left: [1, 5, 3, -5, 3, 4]
