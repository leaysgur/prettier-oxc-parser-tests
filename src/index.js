import { parseSync } from "oxc-parser";

export const languages = [
  // TODO: I'm not yet sure but if tsx is superset of jsx in all cases, these can be merged into one.
  // But at least for now, TS AST is not stabliized yet, so I'm keeping them separated.
  {
    name: "oxc-js",
    parsers: ["oxc-js"],
    extensions: [".js", ".jsx", ".mjs", ".cjs"],
  },
  {
    name: "oxc-ts",
    parsers: ["oxc-ts"],
    extensions: [".ts", ".tsx"],
  },
];

export const parsers = {
  ["oxc-js"]: createParser("dummy.jsx"),
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
