import "./ticTacToe.css";
import PlayerCard from "./PlayerCard";
import GameBoard from "./gameBoard";
import { useGameState } from "./useGameState";
import GameOverScreen from "./GameOver";

function GameScreen() {
  const {
    playerData,
    gameBoard,
    currentActivePlayer,
    updateBoard,
    updatePlayerName,
    winner,
  } = useGameState();
  return (
    <div className="gameScreen">
      {winner ? (
        <GameOverScreen winner={winner} />
      ) : (
        <>
          <div className="playerScreen">
            {playerData.map((player) => {
              return (
                <PlayerCard
                  key={player.symbol}
                  name={player.name}
                  symbol={player.symbol}
                  onNameChange={updatePlayerName}
                />
              );
            })}
          </div>
          <GameBoard board={gameBoard} updateBoard={updateBoard} />
          <p className="turn">Current Turn: {currentActivePlayer.name}</p>
        </>
      )}
    </div>
  );
}

export default GameScreen;
