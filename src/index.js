import { parseSync } from "oxc-parser";

export const languages = [
  {
    name: "oxc",
    parsers: ["oxc"],
    extensions: [".js", ".jsx", ".mjs", ".cjs"],
  },
  {
    name: "oxc-ts",
    parsers: ["oxc-ts"],
    extensions: [".ts", ".tsx", ".mts", ".cts"],
  },
];

export const parsers = {
  ["oxc"]: createParser("dummy.jsx"),
  ["oxc-ts"]: createParser("dummy.tsx"),
};

/** @param {string} fileName */
function createParser(fileName) {
  return {
    parse: (code, _options) => {
      const parsed = parseSync(fileName, code, {
        // NOTE: This should be `false` to state that AST is ESTree compatible,
        // but if set to `false`, it will break code like `let a = /** @type {string | null}* / (null)`
        preserveParens: true,
        experimentalRawTransfer: true,
      });

      if (parsed.errors.length !== 0) {
        // TODO: This can be better
        const firstError = parsed.errors[0];
        // const firstLabel = firstError.labels[0];
        throw new SyntaxError(firstError.message);
      }

      let ast = parsed.program;
      ast.comments = parsed.comments;

      // NOTE: Since `preserveParens` is set to `true`,
      // we need to remove the extra parens manually like Prettier does.
      // And also, other things may be needed.
      // https://github.com/prettier/prettier/blob/1a48db46edb1413ee5414da11ba33a9d795b66cd/src/language-js/parse/postprocess/index.js
      // TODO: ast = postprocess(ast)
      return ast;
    },
    locStart: (node) => node.start,
    locEnd: (node) => node.end,
    // NOTE: TypeScript also uses `estree` printer
    astFormat: "estree",
  };
}
