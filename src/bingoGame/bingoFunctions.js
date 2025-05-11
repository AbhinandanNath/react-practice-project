// import { useCallback, useState } from "react";

export function boardGenerator(size) {

     // Ensure the range is an integer
  const range = Math.floor(75 / size);

  function getColumnNumbers(start) {
    let numbers = [];
    while (numbers.length < size) {
      // Ensure the range is an integer
      let number = start + Math.floor(Math.random() * Math.floor(range));
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }

  let board = [];
  for (let i = 0; i < size; i++) {
    board.push(getColumnNumbers(i * range + 1, range));
  }

  board = board[0].map((_, i) => board.map((col) => col[i]));
  if (size % 2 !== 0) {
    const center = Math.floor(size / 2);
    board[center][center] = "FREE";
  }
  return board;
}

export const checkForWinner = (markedBox, size) => {

  function isWinningLine (indices) {
    for (let [row, col] of indices) {
      const key = `${row}-${col}`;
      if (!(size % 2 !== 0 && row === Math.floor(size / 2) && col === Math.floor(size / 2)) && !markedBox.has(key)) {
        return false; // If any box in the line is not marked, it's not a winning line
      }
    }
    return true; // All boxes in the line are marked
  };
    

  // Check rows
  for (let row = 0; row < size; row++) {
    const rowIndices = [];
    for (let col = 0; col < size; col++) {
      rowIndices.push([row, col]);
    }
    if (isWinningLine(rowIndices)) return rowIndices;
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    const colIndices = [];
    for (let row = 0; row < size; row++) {
      colIndices.push([row, col]);
    }
    if (isWinningLine(colIndices)) return colIndices;
  }

  // Check top-left to bottom-right diagonal
  const diagonal1 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push([i, i]);
  }
  if (isWinningLine(diagonal1)) return diagonal1;

  // Check bottom-left to top-right diagonal
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal2.push([i, size - 1 - i]);
  }
  if (isWinningLine(diagonal2)) return diagonal2;

  return false; // No winning line found
}

// export function useWinningBoxes(checkForWinner, playerDetails) {
//   const [winner, setWinner] = useState(null);
//   const [winningLine, setWinningLine] = useState(null);

//   const checkWinner = useCallback(
//     () => {
//       playerDetails.forEach((player) => {
//         const winningLine = checkForWinner(player.markedBox, player.board.length);
//         if (winningLine) {
//           setWinner(player.name);
//           setWinningLine(winningLine);
//         }
//       });
//     },
//     [checkForWinner, playerDetails]
//   );

//   const resetWinner = () => {
//     setWinner(null);
//     setWinningLine(null);
//   };

//   return { winner, winningLine, checkWinner, resetWinner };
// }
