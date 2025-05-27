export default function higherOrderStyledComponent(WrappedComponent) {
  return function NewComponent({ customClassName, ...props }) {
    return <WrappedComponent {...props} customClassName={customClassName} />;
  };
}
