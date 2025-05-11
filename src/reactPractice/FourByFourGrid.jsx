import { useEffect, useRef, useState } from "react";
import classes from "./FourByFour.module.css";
const boxes = ["box1", "box2", "box3", "box4"];
export default function FourByFourGrid() {
  const [animatedBoxes, setAnimatedBoxes] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    function animateBoxes() {
      boxes.forEach((box, index) => {
       setTimeout(() => {
          setAnimatedBoxes((prevState) => {return [...prevState, box]})
        },(index +1) * 1000)
      })
    }
    

    timerRef.current = setTimeout(animateBoxes, 1000);
    return () => clearTimeout(timerRef.current); // Cleanup the timer on unmount
  }, []);
  return (
    <div className={classes.boxContainer}>
      {boxes.map((item, index) => {
        return (
          <div key={index} className={animatedBoxes.includes(item) ? classes[item] : ""}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
