// const input = {
//   name: "Alice",
//   age: null,
//   city: "London",
//   country: undefined,
//   email: "alice@example.com",
//   phone: null,
//   isActive: true,
//   score: 0
// };
function removeNullUndefined(input) {
  for (let key in input) {
    if (input[key] == null || input[key] == undefined) {
      delete input[key];
    }
  }
  return input;
}
