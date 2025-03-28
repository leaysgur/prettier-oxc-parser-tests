// @ts-check
import { parseSync } from "oxc-parser";
import { addCommentLocation } from "./transform.js";

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
  ["oxc"]: createParser(false),
  ["oxc-ts"]: createParser(true),
};

/** @param {boolean} isJS */
function createParser(isJS) {
  // Enable JSX by default
  const fileName = isJS ? "dummy.jsx" : "dummy.tsx";

  return {
    /**
     * @param {string} code
     * @param {import("prettier").Options} _options
     */
    parse: (code, _options) => {
      const parsed = parseSync(fileName, code, {
        // NOTE: This should be `false` to state that AST is "ESTree" compatible,
        // since `ParenthesizedExpression` is not defined in `ESTree`.
        //
        // But if set this to `false`, it will break code like `let a = /** @type {string | null}* / (null)`.
        // To avoid this, we need to emulate `babel` behavior by setting this to `true`.
        //
        // For TS, it seems that ommiting parens is not a problem.
        preserveParens: isJS,
        // @ts-expect-error: `experimentalRawTransfer` does not exist on `ParserOptions`
        experimentalRawTransfer: true,
      });

      if (parsed.errors.length !== 0) {
        // TODO: This can be better
        const firstError = parsed.errors[0];
        // const firstLabel = firstError.labels[0];
        throw new SyntaxError(firstError.message);
      }

      let ast = parsed.program;
      // NOTE: Add `loc` property to comments only.
      // Basically, `loc(Start|End)` function is used to get the location of the node.
      // But for comments, `loc.(start|end)` seems to be used.
      //
      // Prettier `main` branch refactored this part, so we can remove this once it get merged
      // @ts-expect-error: `comments` does not exist on `Program`
      ast.comments = addCommentLocation(parsed.comments, code);

      // NOTE: Since we set `preserveParens` to `true`,
      // we need to remove the extra parens manually like Prettier does for `babel` parser.
      // And also, other things may be needed.
      // https://github.com/prettier/prettier/blob/1a48db46edb1413ee5414da11ba33a9d795b66cd/src/language-js/parse/postprocess/index.js
      // TODO: ast = postprocess(ast)
      return ast;
    },
    /** @param {import("oxc-parser").Span} node */
    locStart: (node) => node.start,
    /** @param {import("oxc-parser").Span} node */
    locEnd: (node) => node.end,
    // NOTE: TypeScript also uses `estree` printer
    astFormat: "estree",
  };
}
