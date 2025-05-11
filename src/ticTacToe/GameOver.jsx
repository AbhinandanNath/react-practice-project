export default function GameOverScreen({ winner }) {
    return (
        <div className="gameOverScreen">
        <h1>Game Over</h1>
        {winner === "Draw" ? (
            <p>It's a Draw!</p>
        ) : (
            <p>Winner: {winner.name}</p>
        )}
        <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
    );
}