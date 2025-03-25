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
  for (let idx = 0; idx < sourceText.length; idx++) {
    if (sourceText[idx] === "\n") {
      lineStarts.push(idx + 1);
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
  // Binary search for performance
  let low = 0;
  let high = lineStarts.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);

    if (lineStarts[mid] <= offset) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  const line = low;
  const column = offset - lineStarts[line];

  return { line: line + 1, column };
}
