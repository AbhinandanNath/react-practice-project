
import {  useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
export default function TimerComponent (){
    const { time, isRunning, start, stop, reset, cleanup } = useTimer(0);
  
    // Cleanup the timer when the component unmounts
    useEffect(() => {
      return () => cleanup();
    }, [cleanup]);
  
    return (
      <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc" }}>
        <h1>Timer</h1>
        <p style={{ fontSize: "2rem" }}>{time} seconds</p>
        <div>
          <button onClick={start} disabled={isRunning} style={{ margin: "5px" }}>
            Start
          </button>
          <button onClick={stop} disabled={!isRunning} style={{ margin: "5px" }}>
            Stop
          </button>
          <button onClick={reset} style={{ margin: "5px" }}>
            Reset
          </button>
        </div>
      </div>
    );
  };