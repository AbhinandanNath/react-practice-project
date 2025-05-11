
import { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";

// .bingoBoard {
  
// }

// .bingoBoard div {

 
//   /* transition: all 3s ease-in 0.2s; */
// }

const BingoBaord = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.size}, 1fr)`};
  gap: 0.5rem;
  width: 20rem;
  height: 25rem;
  border-radius: 0.5rem;
  padding: 1rem;
  background: linear-gradient(90deg, rgb(155, 120, 46), rgb(245, 180, 0));
  box-shadow: 1px 1px 30px rgba(238, 234, 3);
  perspective: 1000px;

`
const BingoBox = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  color: rgb(5, 5, 5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, rgb(250, 249, 248), rgb(172, 166, 149));
  box-shadow: 1px 1px 10px rgb(0, 0, 0);

`

export default function BingoBoard({ board, markedBox, onCellClick }) {
  const boxRef = useRef(null);
  
//     const [animate , setAnimate] = useState(false);
   useLayoutEffect(() => {
    let box = boxRef.current;
    box.style.transform = "translateY(-100rem)";
    box.style.transition = "transform 0.5s ease-in-out";

    requestAnimationFrame(() => {
      box.style.transform = 'translateY(0)'
    })
   },[board, markedBox])
  
    return (
    <BingoBaord ref={boxRef} size={board.length} >
      {board.map((row, rowIndex) => {
        return row.map((column, colIndex) => {
          let boxKey = `${rowIndex}-${colIndex}`;
          let isMarked = markedBox.has(boxKey);
          return (
            <BingoBox
              className={`${column === "FREE" ? "free " : isMarked ? "isMarked" : ""}`}
              key={boxKey}
              onClick={column === "FREE" ? undefined : () => onCellClick(boxKey, board)}
            >
              {column}
            </BingoBox>
          );
        });
      })}
    </BingoBaord>
  );
}
