import * as prettier from "prettier";

// DEBUG: Read from file
// import { readFileSync} from "node:fs";
// const CODE = readFileSync("./benchmark/fixtures/3930-kb.js", "utf-8");
const CODE = `
// aooo
let a,b=1,c=[2,3,,4,]
`.trim();
const IS_JS = false;

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
console.log("==========================================");

const theirsParser = IS_JS ? "babel" : "typescript";
const theirs = await prettier.format(CODE, {
  parser: theirsParser,
  plugins: [],
});

console.log(`✨ Prettier@${prettier.version}+${theirsParser}:`);
console.log(theirs);
console.log("==========================================");

const oursParser = IS_JS ? "oxc" : "oxc-ts";
const ours = await prettier.format(CODE, {
  parser: oursParser,
  plugins: ["./src/index.js"],
});
console.log(`✨ Ours+${oursParser}:`);
console.log(ours);
console.log("==========================================");
