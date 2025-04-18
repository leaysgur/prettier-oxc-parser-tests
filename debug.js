import * as prettier from "prettier";

// DEBUG: Read from file
// import { readFileSync} from "node:fs";
// const CODE = readFileSync("./benchmark/fixtures/3930-kb.js", "utf-8");
const CODE = `
// aooo
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

const theirs = await prettier.format(CODE, {
  // parser: "babel-ts",
  // parser: "oxc-ts",
  parser: "babel",
  plugins: [],
});

console.log(`✨ Prettier@${prettier.version}+babel:`);
console.log(theirs);

console.log(`✨ Ours:`);
const ours = await prettier.format(CODE, {
  parser: "oxc",
  plugins: ["./src/index.js"],
});
console.log(ours);
