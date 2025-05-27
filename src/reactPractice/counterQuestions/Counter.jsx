import { useEffect, useRef, useState } from "react";
// import "./styles.css";

const initalState = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

export default function Counter() {
  const [boxCountMap, setBoxCountMap] = useState({ ...initalState });
  const [counter, setCounter] = useState(10);
  let counterRef = useRef(null);

  useEffect(() => {
    clearInterval(counterRef.current);
    counterRef.current = setInterval(() => {
      if (counter == 0) {
        setCounter(10);
        setBoxCountMap(initalState);
        clearInterval(counterRef.current);
        return;
      }
      setCounter((prevState) => prevState - 1);
    }, 1000);
  }, [counter]);

  function handleBoxClick(value) {
    if (counter == 0) {
      return;
    } 
    setBoxCountMap((prevBoxState) => {
      let newBoxState = {
        ...prevBoxState,
        [value]: boxCountMap[value] + 1,
      };
      console.log(newBoxState);
      return newBoxState;
    });

    setCounter(value);
  }
  return (
    <div id="container">
      <div style={{color:'black'}}>{counter}</div>
      <div id="boxContainer">
        {Object.keys(boxCountMap).map((key) => {
          return (
            <div
              key={key}
              className={counter == 0 ? "disableBox" : ""}
              onClick={() => handleBoxClick(key)}
            >
              {boxCountMap[key]}
            </div>
          );
        }
      )}
      </div>
    </div>
  );
}
