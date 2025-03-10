import * as prettier from "prettier";

// DEBUG: Read from file
// import { readFileSync} from "node:fs";
// const CODE = readFileSync("./benchmark/fixtures/4000-kb.js", "utf-8");
const CODE = `
let a,b=1,c=[2,3,,4,]
`;

// DEBUG: Inspect AST
// import { parseSync } from "oxc-parser";
// const ast = parseSync("f.jsx", CODE, {
//   preserveParens: true,
//   experimentalRawTransfer: true,
// });
// console.dir(ast.program, { depth: null });
// process.exit(0);

console.log("👻 Original:");
console.log(CODE);

const formatted = await prettier.format(CODE, {
  // parser: "babel-ts",
  // parser: "oxc-ts",
  // parser: "babel",
  parser: "acorn",
  plugins: ["./src/index.js"],
});

console.log("✨ Formatted:");
console.log(formatted);
