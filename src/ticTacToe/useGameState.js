import { useState } from "react";

export const intitalGameBoardData = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const defaultPlayerDetails = [
  { name: "Player 1", symbol: "X", postion: 1 },
  { name: "Player 2", symbol: "O", postion: 2 },
];

function checkWinner(board) {
  // Define all possible winning combinations
  const winningCombinations = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  // Check each winning combination
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    let firstSymbol = board[a[0]][a[1]];
    let secondSymbol = board[b[0]][b[1]];
    let thirdSymbol = board[c[0]][c[1]];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      return firstSymbol; // Return the winner ('X' or 'O')
    }
  }

  // Check for a draw (no empty cells)
  if (board.flat().every((cell) => cell !== null)) {
    return "Draw";
  }

  // No winner yet
  return null;
}

function getPlayerDetailsOnSymbol(playerDetails, symbol) {
  return playerDetails.filter((item) => {
    return item.symbol == symbol;
  });
}

export function useGameState() {
  const [playerData, setPlayerData] = useState([...defaultPlayerDetails]);
  const [gameBoard, setGameBoard] = useState([...intitalGameBoardData]);
  const [winner, setWinner] = useState(null);
  const [currentActivePlayer, setCurrentActivePlayer] = useState(playerData[0]);

  const updateBoard = (rowIndex, colIndex) => {
    setGameBoard((prevBoard) => {
      const newBoard = prevBoard.map((innergameBoard) => [...innergameBoard]);
      if (newBoard[rowIndex][colIndex] === null) {
        newBoard[rowIndex][colIndex] = currentActivePlayer.symbol;

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
          if (gameWinner === "Draw") {
            setWinner("Draw");
          } else {
            const getWinnerDetails = getPlayerDetailsOnSymbol(
              playerData,
              gameWinner
            );
            const gameWinnerDetails = getWinnerDetails[0];
            setWinner(gameWinnerDetails);
          }
        } else {
          return newBoard;
        }
      }
      return prevBoard;
    });
    setCurrentActivePlayer((prev) => {
      const currentSymbol = prev.symbol == "X" ? "O" : "X";
      const playerDetails = getPlayerDetailsOnSymbol(playerData, currentSymbol);
      return playerDetails[0];
    });
  };

  const updatePlayerName = (symbol, newName) => {
    setPlayerData((prevData) =>
      prevData.map((player) =>
        player.symbol === symbol ? { ...player, name: newName } : player
      )
    );
  };

  return {
    playerData,
    gameBoard,
    currentActivePlayer,
    updateBoard,
    updatePlayerName,
    winner,
  };
}
