import { useReducer } from "react";
import styled from "styled-components";
import useCounter from "../../hooks/useCounter";
import CheckboxCounter from "./CheckboxCounter";
const CounterContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin: 2rem auto;
  width: 20rem;
  border: 1px solid rgb(26, 115, 232);
  border: 1px solid
    ${(props) =>
      props.hookcountercolor ? props.hookcountercolor : "rgb(26, 115, 232)"};
  border-radius: 1rem;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;

  button {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`;

// Q.1Create a increment decrement counter using useReducer hook in react
// Q.2create a custom hook forincrement/decrement counter

const intitalCounterState = {
  count: 0,
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return { count: state.count + 1 };
    case "decrease":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function IncrementDecrementCounter() {
  const [state, dispatch] = useReducer(counterReducer, intitalCounterState);
  function handleCountChange(e) {
    if (state.count >= 0) {
      let buttonValue = e.target.innerText == "+" ? "increase" : "decrease";
      dispatch({ type: buttonValue });
    }
  }
  return (
    <>
      <CounterContainer>
        <button onClick={handleCountChange}>+</button>
        {state.count}
        <button onClick={handleCountChange}>-</button>
      </CounterContainer>
      <HookCounter />
      <CheckboxCounter />
    </>
  );
}

export function HookCounter() {
  const { count, increment, decrement } = useCounter();

  return (
    <CounterContainer hookcountercolor="red">
      <button onClick={increment}>+</button>
      {count}
      <button onClick={decrement}>-</button>
    </CounterContainer>
  );
}
