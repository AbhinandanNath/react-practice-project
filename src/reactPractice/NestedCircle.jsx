import { useState } from "react";
import { styled } from "styled-components";

const NestedCircleComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
`;
const SearchInputField = styled.input`
  width: 5rem;
  height: 0.1rem;
  background-color: rgb(177, 192, 197);
  padding: 1rem;
  border: 2px solid #0d373e;
  border-radius: 0.5rem;
  color: black;
  font-weight: bold;
  box-shadow: 1px 1px 10px white;
  text-align: right;
`;
const CircleComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 0.2rem solid transparent;
  background: linear-gradient(black, black) padding-box,
    linear-gradient(90deg, blue, red) border-box;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function NestedCircle() {
  const [circleNumber, setCircleNumber] = useState(0);

  return (
    <NestedCircleComp>
      <CircleNumberField
        circleNumber={circleNumber}
        updateCircleNumber={setCircleNumber}
      />
      <Circle numberofCircles={circleNumber} />
    </NestedCircleComp>
  );
}

export function CircleNumberField({ circleNumber, updateCircleNumber }) {
  function updateNumber(event) {
    updateCircleNumber(event.target.value);
  }

  return (
    <SearchContainer>
      <label htmlFor="circleInput">Number of Circles : </label>
      <SearchInputField
        id="circleInput"
        type="number"
        value={circleNumber}
        onChange={updateNumber}
      ></SearchInputField>
    </SearchContainer>
  );
}

export function Circle({ numberofCircles }) {
  let circleStyle = {
    width: `${numberofCircles * 5}rem`,
    height: `${numberofCircles * 5}rem`,
  };
  return (
    <>
      <CircleComp style={circleStyle}>
        {numberofCircles > 1 ? (
          <Circle numberofCircles={numberofCircles - 1} />
        ) : (
          ""
        )}
      </CircleComp>
    </>
  );
}
