import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { glob } from "tinyglobby";
import { createTwoFilesPatch } from "diff";
import * as prettier from "prettier";
import pkg from "../package.json" with { type: "json" };

const PRETTIER_FORMAT_TESTS_DIR = resolve("../prettier/tests/format");
const DIFF_SNAPSHOTS_DIR = resolve("./coverage/snapshots");

const stats = {};
for (const [PRETTIER_DIR, ext, parser, testParser] of [
  ["js", "js", "babel", "acorn"],
  ["jsx", "jsx", "babel", "acorn"],
  ["typescript", "ts", "typescript", "typescript"],
  ["jsx", "tsx", "typescript", "typescript"],
]) {
  await rm([DIFF_SNAPSHOTS_DIR, ext].join("/"), {
    recursive: true,
    force: true,
  });
  await mkdir([DIFF_SNAPSHOTS_DIR, ext].join("/"), { recursive: true });

  const testAbsPaths = await glob([PRETTIER_DIR], {
    cwd: PRETTIER_FORMAT_TESTS_DIR,
    ignore: ["**/*format.test.js", "**/*.snap"],
    absolute: true,
  });

  const counter = {
    theirsFailed: 0,
    testerFailed: 0,
    oursFailed: 0,
    matched: 0,
    created: 0,
  };
  for (const testAbsPath of testAbsPaths) {
    const code = await readFile(testAbsPath, "utf-8");

    const results = { theirs: null, ours: null };

    try {
      results.theirs = await prettier.format(code, {
        filepath: testAbsPath,
        parser,
        plugins: [],
      });
    } catch {
      // Some tests are expected to fail, so we can ignore them
      counter.theirsFailed++;
      continue;
    }

    try {
      await prettier.format(code, { parser: testParser, plugins: [] });
    } catch {
      // If our tester fails, we can also ignore the test
      counter.testerFailed++;
      continue;
    }

    try {
      results.ours = await prettier.format(code, {
        filepath: testAbsPath,
        parser,
        plugins: ["prettier-oxc-parser"],
      });
    } catch (err) {
      // TODO: This should be fixed, since tester passed
      // console.log(absPath);
      // console.log(err);
      counter.oursFailed++;
      continue;
    }

    if (results.theirs === results.ours) {
      counter.matched++;
      continue;
    }

    const id = testAbsPath
      .split(PRETTIER_FORMAT_TESTS_DIR)
      .pop()
      // Remove the first `/` and category
      .split("/")
      .slice(2)
      .join("/")
      // Remove the file extension
      .split(".")
      .slice(0, -1)
      .join(".")
      // Flatten the path
      .replace(/\//g, ".");

    const patch = createTwoFilesPatch(
      `theirs.${ext}`,
      `ours.${ext}`,
      results.theirs,
      results.ours,
    );

    const dest = [DIFF_SNAPSHOTS_DIR, ext, id].join("/");
    await mkdir(dest, { recursive: true });

    await Promise.all([
      writeFile(`${dest}/source.${ext}`, code),
      writeFile(`${dest}/ours.${ext}`, results.ours),
      writeFile(`${dest}/theirs.${ext}`, results.theirs),
      writeFile(`${dest}/diff.patch`, patch),
    ]);

    counter.created++;
  }

  stats[ext] = {
    ...counter,
    coverage:
      ((counter.matched / (counter.matched + counter.created)) * 100).toFixed(
        2,
      ) + "%",
  };
}

console.log("## Coverage report");
console.log(`- OXC version:`, "`" + pkg.dependencies["oxc-parser"] + "`");
console.log("- Prettier version:", "`" + pkg.devDependencies.prettier + "`");
console.log("");
console.log("```");
console.table(stats);
console.log("```");
