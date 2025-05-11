function customAssign(target, ...sources) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
  
    // Ensure the target is an object
    const finalObject = Object(target);
  
    // Iterate over each source object
    sources.forEach((source) => {
      if (source != null) {
        // Iterate over the source's own properties
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            finalObject[key] = source[key];
          }
        }
      }
    });
  
    return finalObject;
  }

const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

const result = customAssign(target, source1, source2);
console.log(result); // { a: 1, b: 2, c: 3 }