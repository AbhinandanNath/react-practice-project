import { useState } from "react";
import { styled } from "styled-components";

const FlexboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 20rem;
  margin: 2.5rem auto;

  & button {
    border-radius: 1rem;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(177, 192, 197);
    box-shadow: 1px 1px 10px white;
    border: 2px solid #0d373e;
    font-weight: bolder;
  }
`;
const ProgressBarContainer = styled.div`
 max-width: 20rem;
  width: 100%;
  overflow: hidden;
  background-color: rgb(177, 192, 197);
  border: 2px solid ${({bgcolor}) => bgcolor};
  border-radius: 1rem;
  height: 1.5rem;
  box-shadow:  1px 1px 10px white;
`;
const ProgressBar = styled.div`
  width: ${({progress}) => progress+'%'};
  background-color: ${({bgcolor}) => bgcolor};
  transition: width 0.4s ease-in;
`;

export default function Progressbar() {
  const [progress, setProgress] = useState(0); // Use state for progress

  const getBackgroundColor = () => {
    if (progress <= 50 && progress != 0) return "greenyellow";
    else if (progress <= 80 && progress != 0) return "yellow";
    return progress == 0 ? "#0d373e" : "red";
  };

  const increaseProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100)); // Ensure progress does not exceed 100
  };

  const decreaseProgress = () => {
    setProgress((prev) => Math.max(prev - 10, 0)); // Ensure progress does not go below 0
  };
  return (
    <FlexboxContainer>
      <button onClick={increaseProgress}>+</button>
      <ProgressBarContainer bgcolor={getBackgroundColor()}>
        <ProgressBar progress={progress} bgcolor={getBackgroundColor()}>
          {progress}%
        </ProgressBar>
      </ProgressBarContainer>
      <button onClick={decreaseProgress}>-</button>
    </FlexboxContainer>
  );
}
