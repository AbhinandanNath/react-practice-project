import { useRef, useLayoutEffect } from "react";
import { styled } from "styled-components";

const TooltipContainer = styled.div`
  position: absolute;
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
`;
export default function Tooltip({ targetRef, visible }) {
  const tooltipRef = useRef(null);
  useLayoutEffect(() => {
    if (visible) {
      let element = targetRef.current;
      let tooltip = tooltipRef.current;
      let elementPosition = element.getBoundingClientRect();

    tooltip.style.top = `${elementPosition.bottom + window.scrollY }px`;
    tooltip.style.left = `${elementPosition.left + window.scrollX + 100}px`;
    tooltip.style.opacity = 1;
    }
  },[visible,targetRef]);

  return (
    <>{visible && <TooltipContainer ref={tooltipRef}>Tooltip</TooltipContainer>}</>
  );
}
