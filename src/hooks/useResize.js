import { useEffect, useRef, useState } from "react";


export function useResize() {
    const[size,setSize] = useState({width: 0, height :0})

    let elementRef = useRef(null);


    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for(let entry of entries){
                const {width , height} = entry.contentRect;
                setSize( {width , height});
            }
        })

        const currentElemnt = elementRef.current;

        if(elementRef.current){
            resizeObserver.observe(currentElemnt);
        }

        return () => {
            resizeObserver.unobserve(currentElemnt)
        }
    },[]);

    return [elementRef, size]
}

import React from "react";
import useResizeObserver from "../hooks/useResizeObserver";

const ResizableComponent = () => {
  const [ref, size] = useResizeObserver();

  return (
    <div ref={ref} style={{ resize: "both", overflow: "auto", border: "1px solid black", padding: "10px" }}>
      <p>Resize this box!</p>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </div>
  );
};

export default ResizableComponent;