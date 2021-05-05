import re from './re';

/**
 * Replace a regular token like `*` or `_` by HTML tag equivalent.
 * Regular tokens are
 *
 *   1. Same for start and end,
 *   2. May be occured only once from start and end,
 *   3. Must not have spaces after start and before end.
 *
 * That is,
 *
 *   - This is valis: `*example of regular tag*`
 *   - This is not: `* example is incorrect*`
 * @param {string} match - source value where to perform replacement
 * @param {string} token - token to replace, `*` e.g.
 * @param {string} htmlTagName - HTML tag name, `b` e.g.
 * @returns {string}
 */
const replaceToken = (match, token, htmlTagName) => {
  return match
    .replace(re`^\\${token}`, `<${htmlTagName}>`)
    .replace(re`\\${token}$`, `</${htmlTagName}>`);
};

export default replaceToken;
