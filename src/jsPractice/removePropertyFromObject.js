function removeProperty(input, propertyToRemove) {
  return input.map((item) => {
    let { [propertyToRemove]: _, ...other } = item;
    return other;
  });
}
// const input = [
//   { name: "Alice", age: 25, city: "London" },
//   { name: "Bob", age: 30, city: "Paris" },
//   { name: "Charlie", age: 28, city: "Berlin" }
// ];
