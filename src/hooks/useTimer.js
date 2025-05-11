import { useState, useRef, useCallback } from "react";

export function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime); // Timer value
  const [isRunning, setIsRunning] = useState(false); // Timer status
  const timerRef = useRef(null); // Reference to the timer interval

  // Start the timer
  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Increment time every second
    }
  }, [isRunning]);

  // Stop the timer
  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isRunning]);

  const cleanup = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  // Reset the timer
  const reset = useCallback(() => {
    stop(); // Stop the timer before resetting
    setTime(initialTime);
  }, [stop, initialTime]);


  return { time, isRunning, start, stop, reset, cleanup };
}

