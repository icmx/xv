import { r } from './r';

/**
 * Replace a double token like `[[this]]` or `{{ that }}` by HTML tag
 * equivalent. Double tokens are
 *
 *   1. Different for start and end, e.g. `[[` is for start and `]]` is
 * for the end,
 *   2. May be occured twice, or, by a mistake, once from one side,
 *   3. May have some spaces after start and before end like on
 * `[[   this example ]]`.
 *
 * That is,
 *
 *   - These are valid: `[[example]]`, `[[ example]`,
 * `[[ example many words]]`
 *   - There aren't: `[ example ]`, `[example many words]`
 * @param {string} match - source value where to perform replacement
 * @param {string} startToken - start token to replace, `[` e.g.
 * @param {string} endToken - end token to replace, `]` e.g.
 * @param {string} htmlTagName - HTML tag name, `b` e.g.
 * @returns {string}
 */
export const replaceDoubleToken = (
  match,
  startToken,
  endToken,
  htmlTagName
) => {
  return match
    .replace(r`^(\\${startToken})+ {0,}`, `<${htmlTagName}>`)
    .replace(r` {0,}(\\${endToken})+$`, `</${htmlTagName}>`);
};
