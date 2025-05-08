import { readFile, readdir } from "node:fs/promises";
import { bench, run } from "mitata";
import * as prettier from "prettier";
import pkg from "../package.json" with { type: "json" };

const JS_FIXTURES_DIR = "./benchmark/fixtures/js";
const TS_FIXTURES_DIR = "./benchmark/fixtures/ts";

console.log("## Benchmark report");
console.log("- OXC version:", "`" + pkg.dependencies["oxc-parser"] + "`");
console.log("- Prettier version:", "`" + pkg.devDependencies.prettier + "`");
console.log("");

console.log("### JS(X)");
for (const file of await readdir(JS_FIXTURES_DIR)) {
  console.log("#### %s", file);
  const CODE = await readFile(`${JS_FIXTURES_DIR}/${file}`, "utf8");

  bench("$parser", function* (state) {
    const parser = state.get("parser");

    const options = {
      parser,
      plugins: parser.startsWith("oxc") ? ["./src/index.js"] : [],
    };

    yield async () => await prettier.format(CODE, options);
  }).args("parser", ["oxc", "babel"]);

  await run({ format: "markdown" });
  console.log("");
}

console.log("");

console.log("### TS(X)");
for (const file of await readdir(TS_FIXTURES_DIR)) {
  console.log("#### %s", file);
  const CODE = await readFile(`${TS_FIXTURES_DIR}/${file}`, "utf8");

  bench("$parser", function* (state) {
    const parser = state.get("parser");

    const options = {
      parser,
      plugins: parser.startsWith("oxc") ? ["./src/index.js"] : [],
    };

    yield async () => await prettier.format(CODE, options);
  }).args("parser", ["oxc-ts", "typescript"]);

  await run({ format: "markdown" });
  console.log("");
}
