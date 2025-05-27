export default function findFactorial(num) {
  if (num == 0 || num == 1) {
    return num;
  } else {
    return num * findFactorial(num - 1);
  }
}

function findLongestWord(sentence) {
  let wordsArray = sentence.split("");
  let longestWord = "";
  for (let word of wordsArray) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

function findMaximumNumberinArray(nums) {
  let maxNumber = -Infinity;
  for (let num of nums) {
    maxNumber = Math.max(maxNumber, num);
  }

  return maxNumber;
}
