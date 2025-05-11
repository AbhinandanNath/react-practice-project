/* eslint-disable react-refresh/only-export-components */

import { useRef, useCallback} from "react";
import { styled } from "styled-components";

const SearchContainer = styled.div`
  width: 20rem;
  max-width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const SearchInputField = styled.input`
  width: 20rem;
  height: 1rem;
  background-color: rgb(177, 192, 197);
  padding: 1rem;
  border: 2px solid #0d373e;
  border-radius: 1rem;
  color: black;
  font-weight: bold;
  box-shadow: 1px 1px 10px white;
`;

export function useDebounce(callbackFn, waitTime) {
  const timer = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      // Clear the previous timer
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // Set a new timer
      timer.current = setTimeout(() => {
        callbackFn(...args);
      }, waitTime);
    },
    [callbackFn, waitTime]
  );

  return debouncedFunction;
}

export function useThrottle(callbackFn, limit) {
  let inThrottle = useRef(false);
  return function (...arg) {
    if (!inThrottle.current) {
      callbackFn(...arg);
      inThrottle.current = true;
      setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  };
}

export default function Debounce() {
  const handleInputSearch = (value, fieldType) => {
    console.log(`Search value for ${fieldType} is: ${value}`);
  };

  // Create a debounced version of the search handler
  const debouncedSearch = useDebounce((value) => {
    handleInputSearch(value, "text");
  }, 3000);

  return (
    <SearchContainer>
      <SearchInputField
        type="text"
        placeholder="Search..."
        onChange={(event) => debouncedSearch(event.target.value)} // Use the debounced function here
      />
    </SearchContainer>
  );
}





// Usage

// Array.prototype.customReducer = function (callbackFn, initialValue) {
//   if (!Array.isArray(this) || this.length === 0) {
//     console.log(`${this} is not an array`);
//     return false;
//   }

//   let array = this;
//   let accumulator = initialValue;
//   let startIndex = 0;

//   if (accumulator === undefined || (initialValue && initialValue.length == 0)) {
//     accumulator = array[0];
//     startIndex = 1;
//   }

//   for (let i = startIndex; i < array.length; i++) {
//     if (i in array) {
//       console.log(
//         `Index: ${i}, Accumulator: ${accumulator}, CurrentValue: ${array[i]}`
//       );
//       accumulator = callbackFn(accumulator, array[i], i, array);
//     }
//   }

//   return accumulator;
// };

// Array.prototype.customMap = function (callbackFn) {
//   if (!Array.isArray(this) || this.length === 0) {
//     console.log("INVALID");
//     return [];
//   }

//   let array = this;
//   let resultArray = [];

//   for (let i = 0; i < array.length; i++) {
//     if (i in array) {
//       // Ensure the index exists in the array
//       resultArray[i] = callbackFn(array[i], i, array);
//     }
//   }
//   return resultArray;
// };

// Array.prototype.customFilter = function (callbackFn) {
//   if (!Array.isArray(this) || this.length === 0) {
//     console.log("INVALID");
//     return [];
//   }

//   let array = this;
//   let resultArray = [];

//   for (let i = 0; i < array.length; i++) {
//     if (i in array) {
//       // Ensure the index exists in the array
//       resultArray[i] = callbackFn(array[i], i, array);
//     }
//   }
//   return resultArray;
// };

// const nestedArray = [[1, 2], [3, 4], [5]];
// const flatArray = nestedArray.customReducer((accumulator, currentValue) => {
//   return accumulator.concat(currentValue);
// }, []);

// // Example usage of maxProductSubArray
// console.log(maxProductSubArray([2, 3, -2, 4]));

// var x = {
//   "a" : [1,2],
//   "b" : [4,3],
//   "c" : [5,7]
// }

// var x = {

//   a : 1,
//   b : {
//     c : 2,
//     d : 3
//   },
//   e : {
//     f : {
//       g : 4
//     }
//   },
//   h: 1,
//   i : {
//     j : 2,
//     k : 3
//   }
// }

// function removeDuplicateEntries(obj, uniqueValues = new Set()) {

//   const uniqueObj = {}; // To store the result object
//   for(let key in obj) {
//     let value = obj[key];
//     let stringValue = JSON.stringify(value); // Convert the value to a string for comparison
//     if(!uniqueValues.has(stringValue)) {
//       uniqueValues.add(stringValue); // Add the stringified value to the Set
//      uniqueObj[key] = removeDuplicateEntries(value, uniqueValues);
//     }
//   }

//  return uniqueObj;
// }

// // Example usage of isStringAnagram
// console.log(isStringAnagram("listen", "silent")); // true
// console.log(isStringAnagram("hello", "world")); // false

// function test(n) {
//   let spaces = n - 1;
//   let testArr = [];
//   for (let i = 1; i <= n; i++) {
//     if(i==n) {
//       spaces = 1;
//     }
//     let spaceString = Array(spaces).fill('-').join("");
//     let symbolString = "";
//     for (let j = 0; j <= i; j++) {
//         if(j==i){
//            symbolString += `${spaceString}`
//         } else {
//            symbolString += `${spaceString}&`
//         }
//     }
//     console.log(symbolString);
//     testArr.push(symbolString);
//     spaces--;
//   }
// }
