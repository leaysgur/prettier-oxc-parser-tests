import * as prettier from "prettier";

// DEBUG: Read from file
// import { readFileSync} from "node:fs";
// const CODE = readFileSync("./benchmark/fixtures/ts/0007-kb.ts", "utf-8");
const CODE = `
let a=1; enum A{a, b }
`.trim();
const IS_JS = false;
const parser = IS_JS ? "babel" : "typescript";
const filepath = IS_JS ? "f.js" : "f.ts";

// DEBUG: Inspect AST
// import { parseSync } from "oxc-parser";
// const ast = parseSync("f.ts", CODE, {
//   preserveParens: true,
// });
// console.dir(ast.program, { depth: null });
// process.exit(0);

console.log("👻 Original:");
console.log(CODE);
console.log("==========================================");

const theirs = await prettier.format(CODE, {
  parser,
  filepath,
  plugins: [],
});

console.log(`✨ Prettier@${prettier.version}+${parser}:`);
console.log(theirs);
console.log("==========================================");

const ours = await prettier.format(CODE, {
  parser,
  filepath,
  plugins: ["prettier-oxc-parser"],
});
console.log(`✨ Ours+${parser}:`);
console.log(ours);
console.log("==========================================");
