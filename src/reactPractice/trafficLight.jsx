import { useEffect, useState, useRef } from "react";

const lightDurationMap = [
    { color: "red", duration: 4000 },
    { color: "yellow", duration: 2000 },
    { color: "green", duration: 3000 },
  ];


//view model
function useTrafficLightViewModel() {
    const [currentLightIndex, setCurrentLightIndex] = useState(0);
    const [counter,] = useState(0);

    let timerRef = useRef(null);
    //Handle light changes
    useEffect(() => {
      function handleLightChange() {
        const nextLightIndex = (currentLightIndex + 1) % lightDurationMap.length;
        const duration = lightDurationMap[currentLightIndex].duration;

        timerRef.current = setTimeout(() => {
          setCurrentLightIndex(nextLightIndex);
        }, duration);

        return () => {
          clearTimeout(timerRef.current);
        };
      }

      handleLightChange();
    }, [currentLightIndex]);
  
    return { currentLightIndex, counter };
    
}


// View
function TrafficLightView() {
    const { currentLightIndex, counter } = useTrafficLightViewModel();
  
    return (
      <div id='mainContainer'>
        <div id="trafficLightContainer">
          {lightDurationMap.map((light, index) => (
            <div
              key={light.color}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: currentLightIndex === index ? light.color : "gray",
              }}
            ></div>
          ))}
        </div>
        <div id='timer'>Time Remaining: {counter}s</div>
      </div>
    );
  }
  
  export default TrafficLightView;
