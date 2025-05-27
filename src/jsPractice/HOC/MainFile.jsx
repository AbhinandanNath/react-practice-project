import { BaseButtonComponent } from "./BaseButtonComponent";
import higherOrderStyledComponent from "./HigherOrderStyledComponent";

export default function MainFile() {
  const StyledButton = higherOrderStyledComponent(BaseButtonComponent);
  const StyledButton2 = higherOrderStyledComponent(BaseButtonComponent);
  return (
    <div id="mainContainer">
      <StyledButton
        customClassName="hoc-button1"
        onClick={() => console.log("button1")}
      >
        Button 1
      </StyledButton>
      <StyledButton2
        customClassName="hoc-button2"
        onClick={() => console.log("button2")}
      >
        Button 2
      </StyledButton2>
    </div>
  );
}

// className={`baseButtonComponent ${className}`}
