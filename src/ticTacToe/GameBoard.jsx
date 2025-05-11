import React from "react";

function GameBoard({ board, updateBoard }) {
  return (
    <div id="gameboard">
      {board.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          let key = `${rowIndex}-${colIndex}`;
          let boxClass = `gameBoardCell ${col == null ? "" : "filled"}`;
          
          return (
            <div key={key} className={boxClass} onClick={() => updateBoard(rowIndex, colIndex, col)}>
              <p className="symbol">{col}</p>
            </div>
          );
        });
      })}
    </div>
  );
}

export default GameBoard;
