import { readFile, readdir } from "node:fs/promises";
import { bench, run } from "mitata";
import * as prettier from "prettier";
import pkg from "../package.json" with { type: "json" };

const FIXTURES = await readdir("./benchmark/fixtures");

console.log("- OXC version:", "`" + pkg.dependencies["oxc-parser"] + "`");
console.log("- Prettier version:", "`" + pkg.devDependencies.prettier + "`");
console.log("");

console.log("### JS(X)");
for (const file of FIXTURES) {
  console.log("#### %s", file);
  const CODE = await readFile(`./benchmark/fixtures/${file}`, "utf8");

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
