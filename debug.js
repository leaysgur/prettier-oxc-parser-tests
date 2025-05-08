import * as prettier from "prettier";

// DEBUG: Read from file
import { readFileSync} from "node:fs";
const CODE = readFileSync("./benchmark/fixtures/ts/0007-kb.ts", "utf-8");
// const CODE = `
// enum A { a, b }
// `.trim();
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
