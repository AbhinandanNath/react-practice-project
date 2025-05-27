export function BaseButtonComponent({ customClassName, children, ...props }) {
  return (
    <button {...props} className={`baseButtonComponent ${customClassName}`}>
      {children}
    </button>
  );
}

// .baseButtonComponent {
//   width: 6rem;
//   height: 2rem;
//   border-radius: 0.5rem;
//   border: none;
//   cursor: pointer;
//   font-size: 1rem;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .hoc-button1 {
//   background-color: aqua;
// }

// .hoc-button2 {
//   background-color: rgb(29, 26, 154);
//   width: 10rem;
// }
