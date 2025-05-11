
import { useState, useRef, useCallback } from "react";
import BingoBoard from "./bingoBoard";
import "./Bingo.css";
import ToolTip from "./Tooltip";

import { boardGenerator, checkForWinner } from "./bingoFunctions";

export default function BingoScreen() {
  const [boardSize, setBoardSize] = useState(4);
  const [player1Board, setPlayer1Board] = useState(boardGenerator(boardSize));
  const [player2Board, setPlayer2Board] = useState(boardGenerator(boardSize));
  const [playerOneMarkedBox, setPlayerOneMarkedBox] = useState(new Set());
  const [playerTwoMarkedBox, setPlayerTwoMarkedBox] = useState(new Set());
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const [visible, setVisible] = useState(false);
  const titleRef = useRef(null);

  const playerDetails = [
    {
      name: "player 1",
      markedBox: playerOneMarkedBox,
      markedBoxFn: setPlayerOneMarkedBox,
      board: player1Board,
    },
    {
      name: "player 2",
      markedBox: playerTwoMarkedBox,
      markedBoxFn: setPlayerTwoMarkedBox,
      board: player2Board,
    },
  ];


  const resetWinner = useCallback(() => {
    setWinner(null);
    setWinningLine(null);
  }, []);

  const updateBoardSize = (e) => {
    let boardSize = e.target.value;
    setBoardSize(boardSize);
    setPlayer1Board(boardGenerator(boardSize));
    setPlayer2Board(boardGenerator(boardSize));
    setPlayerOneMarkedBox(new Set());
    setPlayerTwoMarkedBox(new Set());
    setCalledNumbers([]);
  };

  // function updateBoard(board, num) {
  //   board.forEach((row, rowIndex) => {
  //     row.forEach((col, colIndex) => {
  //       if (num == col) {
  //         let markedKey = `${rowIndex}-${colIndex}`;
  //         updateMarkedBox(markedKey, board);
  //       }
  //     });
  //   });
  // }

  function callNumber() {
    const numberArray = Array.from({ length: 75 }, (_, i) => i + 1);
    let remaingNumArray = numberArray.filter(
      (item) => !calledNumbers.includes(item)
    );
    if (remaingNumArray.length === 0) {
      return;
    }
    let randomIndex = Math.floor(Math.random() * remaingNumArray.length);
    let num = remaingNumArray[randomIndex];
    setCalledNumbers([...calledNumbers, num]);
  }

  const updateMarkedBox = (key, board) => {
    let currentPlayer = playerDetails.filter((item) => item.board == board)[0];
    let markedBoxFn = currentPlayer.markedBoxFn;
    markedBoxFn((prevState) => {
      const updatedSet = new Set(...prevState); // Create a new Set
      updatedSet.add(key); // Add the new key
      let isWinning = checkForWinner(updatedSet, board.length); // Check for winner after updating marked boxes
      console.log(isWinning);
      if (isWinning) {
        setWinner(currentPlayer.name);
        setWinningLine(isWinning);
      }
      return updatedSet; // Return the updated Set
    });
  };

  const restart = () => {
    setPlayer1Board(boardGenerator(boardSize));
    setPlayer2Board(boardGenerator(boardSize));
    setPlayerOneMarkedBox(new Set());
    setPlayerTwoMarkedBox(new Set());
    setCalledNumbers([]);
    resetWinner();
  };

  return (
    <div id="bingoScreen">
      <h2
        ref={titleRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        Bingo Game
      </h2>
      {visible && <ToolTip visible={visible} targetRef={titleRef} />}

      {winner ? (
        <div id="bingoWon">
          <div id="bingoWinnerDetails">
            <p>{winner} Won</p>
            <button className="defaultButton restart" onClick={restart}>
              Restart
            </button>
          </div>

          <BingoBoard
            key={playerDetails.filter((item) => item.name == winner)[0].name}
            board={playerDetails.filter((item) => item.name == winner)[0].board}
            markedBox={
              new Set(winningLine.map((item) => `${item[0]}-${item[1]}`))
            }
            onCellClick={updateMarkedBox}
          />
        </div>
      ) : (
        <div>
          <div id="twoBoard">
            {playerDetails.map((player) => {
              return (
                <BingoBoard
                  key={player.name}
                  board={player.board}
                  markedBox={player.markedBox}
                  onCellClick={updateMarkedBox}
                />
              );
            })}
            <div id="calledNumberConatiner">
              <label htmlFor="inputNumber">Enter Board Size</label>
              <input
                type="number"
                id="inputNumber"
                min="4"
                max="10"
                value={boardSize}
                onChange={updateBoardSize}
              />
              <label htmlFor="inputNumber">Enter Number of Players</label>
              <input
                type="number"
                id="inputNumber"
                min="1"
                max="4"
                value={2}
                disabled={true}
                onChange={updateBoardSize}
              />
              <button className="defaultButton" onClick={callNumber}>
                Call Number
              </button>
              <ul>
                {calledNumbers.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
