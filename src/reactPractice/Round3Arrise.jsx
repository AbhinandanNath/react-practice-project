

import { useState } from "react";
import classes from "./Round3Arrise.module.css";

// render buttons based on array input
// 3 boxes , with each box value as 1,2 ,3
// when clicked on button and box respective sum should be shown

const inputArray = [5, 10, 15, 20];
const boxMap = [1, 2, 3]
// const boxMap = { box1: 1, box2: 2, box3: 3 };

export default function Round3Arrise() {
  const [buttonInput, setButtonInput] = useState(null);
  const [boxValue, setBoxValue] = useState([...boxMap]);

  function handleButtonInput(btnvalue) {
    setButtonInput(null);
    setBoxValue([...boxMap]);
    setButtonInput((prevState) => prevState + btnvalue);
  }

  function handleBoxInput(selectedIndex) {
    // console.log(selectedIndex, boxInput);
    if (buttonInput) {
      setBoxValue((prevBoxValue) => {
        let updatedBoXValue = [...prevBoxValue];
       updatedBoXValue[selectedIndex] += buttonInput

        return updatedBoXValue;
      });
      
    }

  }
  return (
    <div className={classes.mainConatiner}>
      <div className={classes.buttonContainer}>
        {inputArray.map((item, index) => {
          return (
            <button key={index + item} onClick={() => handleButtonInput(item)}>
              {item}
            </button>
          );
        })}
      </div>
      <div className={classes.boxContainer}>
        {boxValue.map((item, index) => {
          return (
            <div key={index + item} onClick={() => handleBoxInput( index)}>
              <p className={classes.totalSum}>{ (buttonInput && item !== index + 1)? item : ""}</p>
            </div>
          );
        })}
      </div>
    </div>
   
  );
}



