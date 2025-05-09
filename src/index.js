// @ts-check
import { parseSync } from "oxc-parser";
import { addCommentLocation } from "./transform.js";

export const parsers = {
  babel: createParser(true),
  typescript: createParser(false),
};

/** @param {boolean} preserveParens */
function createParser(preserveParens) {
  return {
    /**
     * @param {string} code
     * @param {import("prettier").Options} options
     */
    parse: (code, options) => {
      const parsed = parseSync(options.filepath ?? "dummy.tsx", code, {
        // NOTE: This should be `false` to state that AST is "ESTree" compatible,
        // since `ParenthesizedExpression` is not defined in `ESTree`.
        //
        // But if set this to `false`, it will break code like `let a = /** @type {string | null}* / (null)`.
        // To avoid this, we need to emulate `babel` behavior by setting this to `true`.
        //
        // For TS, it seems that ommiting parens is not a problem.
        preserveParens,
        // NOTE: Do not check semantic errors like Prettier does.
        // - JS: `babel` parser uses `errorRecovery` option
        // - TS: `typescript` parser uses `@typescript-eslint/typescript-estree`'s `parse()`
        // They do not throw semantic errors
        showSemanticErrors: false,
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
      addCommentLocation(parsed.comments, code);
      // @ts-expect-error: `comments` does not exist on `Program`
      ast.comments = parsed.comments;

      // NOTE: Since we set `preserveParens` to `true`,
      // we need to remove the extra parens manually like Prettier does for `babel` parser.
      // And also, other things may be needed.
      // https://github.com/prettier/prettier/blob/1a48db46edb1413ee5414da11ba33a9d795b66cd/src/language-js/parse/postprocess/index.js
      // For TS, postprocess is also needed, except for parens.
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
