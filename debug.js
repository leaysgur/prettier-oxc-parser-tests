import * as prettier from "prettier";

const CODE = `
const a=1;;
let b = ((1+2)*3)
let c = /** @type {string | null} */ (null);
`;
console.log("👻 Original:");
console.log(CODE);

const formatted = await prettier.format(CODE, {
  // parser: "babel-ts",
  // parser: "oxc-ts",
  // parser: "babel",
  parser: "oxc-js",
  plugins: ["./src/index.js"],
});

console.log("✨ Formatted:");
console.log(formatted);
