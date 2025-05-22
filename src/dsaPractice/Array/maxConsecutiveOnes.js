function maxConsecutiveOnes(nums) {
  let count = 0;
  let maxCount = 0;
  for (let num of nums) {
    if (num == 1) {
      count += 1;
      if (count > maxCount) {
        maxCount = count;
      }
    } else {
      count = 0;
    }
  }
  return maxCount;
}

// Input: nums = [1, 1, 0, 0, 1, 1, 1, 0]

// Output: 3

// Explanation: The maximum consecutive 1s are present from index 4 to index 6, amounting to 3 1s

// Input: nums = [0, 0, 0, 0, 0, 0, 0, 0]

// Output: 0

// Explanation: No 1s are present in nums, thus we return 0
