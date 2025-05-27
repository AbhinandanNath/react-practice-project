import { useState } from "react";

export default function useCounter(countValue = 0) {
  const [count, setCount] = useState(countValue);

  function increment() {
    setCount((prevState) => prevState + 1);
  }
  function decrement() {
    setCount((prevState) => prevState - 1);
  }

  return {
    count,
    increment,
    decrement,
  };
}
