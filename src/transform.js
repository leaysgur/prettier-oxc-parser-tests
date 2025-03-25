// @ts-check

/**
 * Adds `loc` with minimum propperties to the comments
 * https://github.com/estree/estree/blob/master/es5.md#node-objects
 *
 * @param {import("oxc-parser").Comment[]} comments
 * @param {string} sourceText
 */
export function addCommentLocation(comments, sourceText) {
  if (comments.length === 0) return comments;

  // Precompute line start positions
  const lineStarts = [0];
  for (let i = 0; i < sourceText.length; i++) {
    if (sourceText[i] === "\n") {
      lineStarts.push(i + 1);
    }
  }

  for (const comment of comments) {
    // @ts-expect-error: `loc` does not exist on `Comment`
    comment.loc = {
      start: getLineAndColumn(comment.start, lineStarts),
      end: getLineAndColumn(comment.end, lineStarts),
    };
  }
}

/**
 * Converts a character offset to line and column information
 *
 * @param {number} offset
 * @param {number[]} lineStarts
 * @returns {{ line: number, column: number }}
 */
function getLineAndColumn(offset, lineStarts) {
  let line = 0;
  for (let i = 1; i < lineStarts.length; i++) {
    if (lineStarts[i] > offset) break;
    line = i;
  }

  const column = offset - lineStarts[line];
  return { line: line + 1, column };
}
