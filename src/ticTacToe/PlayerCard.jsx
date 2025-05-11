import React, { useState } from "react";

function PlayerCard({ name, symbol,onNameChange }) {
  const [isEditAllowed, setIsEditAllowed] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditToggle = () => {
    setIsEditAllowed((prev) => !prev);
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
    onNameChange(symbol, e.target.value); // Call the function to update the name in the parent component
  };

//   const handleSave = () => {
//     setIsEditAllowed(false);
//     console.log("Updated Name:", playerName); // Save or process the updated name here
//   };

  return (
    <div id="playerBox">
      {!isEditAllowed ? (
        <span className="playerName" title={playerName}>
          {playerName}
        </span>
      ) : (
        <input
          className="playerName"
          type="text"
          value={playerName}
          placeholder="Enter Player Name"
          onChange={handleNameChange}
          //onBlur={handleSave} // Save when the input loses focus
        />
      )}
      <p className="playerSymbol">{symbol}</p>
      <button onClick={handleEditToggle}>
        {isEditAllowed ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default PlayerCard;